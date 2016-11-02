import Faker from 'faker';
import _ from 'lodash';

import UserModel from '../db/schemas/user';
import PlaceModel from '../db/schemas/place';

// _.times(10, ()=> {
//   return new Promise((resolve, reject) => {
//     const person = new UserModel({
//       firstname: Faker.name.firstName(),
//       lastname: Faker.name.lastName(),
//       email: Faker.internet.email()
//     });
//     person.save(err => {
//       if (err) {
//         reject(err);
//       }
//       resolve(person)
//     })
//   }).then(person => {
//     console.log(person);
//   })
// });

_.times(10, ()=> {
  return new Promise((resolve, reject) => {
    const place = new PlaceModel({
      name: Faker.company.companyName(),
      address: Faker.address.streetAddress(),
      location: `${Faker.address.latitude()}, ${Faker.address.longitude()}`,
    });
    place.save(err => {
      if (err) {
        reject(err);
      }
      resolve(place)
    })
  }).then(place => {
    console.log(place);
  })
});
