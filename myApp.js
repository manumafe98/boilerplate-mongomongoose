require('dotenv').config();
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//Create a Model
const { Schema } = mongoose;

const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

//Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  let alextiger = new Person({name: 'Alex Tiger', age: 20, favoriteFoods: ['pizza', 'pasta']})
  alextiger.save(function(err, data){
    if (err) return console.error(err)
    done(null, data)
  })
}

//Create Many Records with model.create()
var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data){
    if (err) return console.error(err)
    done(null, data);  
  })
};

//Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data){
    if (err) return console.error(err)
    done(null, data)
  })
}

//Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data){
    if (err) return console.log(err)
    done(null, data);    
  })
};

//Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data){
    if (err) return console.log(err)
    done(null, data);
  })
};

//Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  Person.findById(personId, function(err, person){
    if (err) return console.log(err)
    
    person.favoriteFoods.push(foodToAdd)
  
    person.save(function(err, updatedPerson){
    if (err) return console.error(err)
    done(null, updatedPerson)
    })
  })
};

//Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, person){
    if (err) return console.log(err)
    done(null, person)
  })
}

//Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, person){
    if(err) return console.log(err)
    done(null, person)
  })
};

//Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, person){
    if (err) console.log(err)
    done(null, person);
  })
};

//Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}) //realiza la busqueda de las personas que coincidan con la favoriterFoods = burrito
        .sort({name: 1}) //ordena de manera descendente
        .limit(2) //limita los documentos a 2
        .select({age: 0}) //oculta el valor de edad, porque esta seteado a 0
        .exec(function(err, data){ //le pasamos la callback a .exec ya que siempre se le pasa la callback funcion al ultimo metodo
          if(err) console.log(err) //ya que si no hacemos esto la query no es ejecutada 
          done(err, data)}) 
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
