var Person = require('../db/cb').Person;
Person.find({}, (err, data) => console.log(err, data))
