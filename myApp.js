require('dotenv').config();
const mongoose = require('mongoose');
console.log("🔍 URI usada en tiempo real:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conexión exitosa a MongoDB');
  })
  .catch((err) => {
    console.error('❌ Error al conectar a MongoDB:', err.message);
  });



const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  age: {
    type: Number,
    min: 0
  },
  favoriteFoods: {
    type: [String],
    default: []
  }
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: 'Jose Solano',
    age: 39,
    favoriteFoods: ['tacos', 'pizza', 'mole']
  });
  newPerson.save()
  .then(data => {
    console.log('✅ Persona guardada:', data);
    done(null, data);
  })
  .catch(err => {
    console.error('❌ Error al guardar la persona:', err);
    done(err);
  });
};

const arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = function(arrayOfPeople, done) {
  console.log('📦 Array que vamos a crear:', arrayOfPeople);

  Person.create(arrayOfPeople, function (err, people) {
    if (err) {
      console.error('❌ Error al crear personas:', err);
      return done(err);
    }
    console.log('✅ Personas creadas:', people);
    done(null, people);
  });
};

const findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, personFound) {
    if (err) {
      console.error('❌ Error al buscar personas:', err);
      return done(err);
    }
    console.log('✅ Persona encontrada:', personFound);
    done(null, personFound);
  });
};

const findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function (err, data){
    if (err) {
      console.error('❌ Error al buscar personas:', err);
      return done(err);
    }
    console.log('✅ Persona encontrada:');
    done(null, data);
  });
};

const findPersonById = function(personId, done) {
  Person.findById(personId, function (err, data){
    if (err){
      console.error('❌ Error al buscar personas:', err);
      return done(err);
    }
    console.log('✅ Persona encontrada:');
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

   Person.findById(personId, function (err, person){
    if (err){
      console.error('❌ Error al buscar personas:', err);
      return done(err);
    }
    console.log('✅ Persona encontrada:');

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) =>{
    if(err) {
      console.error('❌ Error al buscar personas:', err);
      return done(err);
    }
    console.log('✅ Persona encontrada:');
    done(null, updatedDoc);
  });
};

const removeById = (personId, done) => {
  
  Person.findByIdAndRemove(personId, (err, removeDoc) => {
    if (err) {
      console.error('❌ Error al eliminar persona:', err);
      return done(err);
    }
    console.log('✅ Persona eliminada:');
    done(null, removeDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 }) // orden ascendente por nombre
    .limit(2) // máximo dos resultados
    .select({ age: 0 }) // excluir el campo `age`
    .exec(function (err, data) {
      if (err) {
        console.error("❌ Error en queryChain:", err);
        return done(err);
      }
      console.log("✅ Resultados de queryChain:", data);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
