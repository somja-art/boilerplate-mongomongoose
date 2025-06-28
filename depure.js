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
  Person.find({name: personName}, (err, personFound) => {
    if (err) {console.log(err);}
    else {done(null, personFound);}
  });
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

const removeMany = require("./myApp.js").removeManyPeople;
router.post("/remove-many-people", function (req, res, next) {
  Person.remove({}, function (err) {
    if (err) {
      return next(err);
    }
    let t = setTimeout(() => {
      next({ message: "timeout" });
    }, TIMEOUT);
    Person.create(req.body, function (err, pers) {
      if (err) {
        return next(err);
      }
      try {
        removeMany(function (err, data) {
          clearTimeout(t);
          if (err) {
            return next(err);
          }
          if (!data) {
            console.log("Missing `done()` argument");
            return next({ message: "Missing callback argument" });
          }
          Person.count(function (err, cnt) {
            if (err) {
              return next(err);
            }
            if (data.ok === undefined) {
              // for mongoose v4
              try {
                data = JSON.parse(data);
              } catch (e) {
                console.log(e);
                return next(e);
              }
            }
            res.json({
              n: data.n,
              count: cnt,
              ok: data.ok,
            });
          });
        });
      } catch (e) {
        console.log(e);
        return next(e);
      }
    });
  });
});