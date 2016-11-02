import ottoman from 'ottoman';
import couchbase  from 'couchbase';
const cluster = new couchbase.Cluster('couchbase://172.18.0.2');
ottoman.bucket = cluster.openBucket('default');

import Faker from 'faker';
import _ from 'lodash';

const Person = ottoman.model('Person', {
  firstName: 'string',
  lastName: 'string',
  email: 'string'
});

const Post = ottoman.model('Post', {
  title: 'string',
  content: 'string',
  person: Person
});

ottoman.ensureIndices(function(err) {
  if (err) {
    console.log('failed to created neccessary indices', err);
    return;
  }
  console.log('ottoman indices are ready for use!');

  // _.times(10, ()=> {
  //   return new Promise((resolve, reject) => {
  //     const person = new Person({
  //       firstName: Faker.name.firstName(),
  //       lastName: Faker.name.lastName(),
  //       email: Faker.internet.email()
  //     });
  //     person.save(err => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(person)
  //     })
  //   }).then(person => {
  //     const times = Math.floor(Math.random() * (5 - 1)) + 1;
  //     _.times(times, i => {
  //       const post = new Post({
  //         title: `Sample post ${i} by ${person.firstName}`,
  //         content: 'here is some content',
  //         person: person
  //       })
  //       post.save(err => console.log("POST", err))
  //     });
  //   })
  // });

});

module.exports = {
  PersonCb: Person,
  PostCb: Post,
}
