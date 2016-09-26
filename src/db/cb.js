var ottoman = require('ottoman');
var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://172.18.0.2');
ottoman.bucket = cluster.openBucket('default');

const Person = ottoman.model('Person', {
  firstName: 'string',
  lastName: 'string',
  email: 'string'
}, {
  index: {
    findByFirstName: {
      by: 'firstName',
      type: 'n1ql'
    },
    findByLastName: {
      by: 'lastName',
      type: 'n1ql'
    },
    findByEmail: {
      by: 'email',
      type: 'n1ql'
    }
  }
});

const Post = ottoman.model('Post', {
  title: 'string',
  content: 'string',
  person: Person
}, {
  index: {
    findByTitle: {
      by: 'title',
      type: 'n1ql'
    },
    findByPerson: {
      by: 'person',
      type: 'refdoc'
    }
  }
});

ottoman.ensureIndices(function(err) {
  if (err) {
    console.log('failed to created neccessary indices', err);
    return;
  }

  console.log('ottoman indices are ready for use!');

  // const person = new Person({
  //   firstName: 'Jose',
  //   lastName: 'Navarro',
  //   email: 'a@c.com'
  // });
  //
  // person.save(err => console.log(err))
  //
  // Person.findByFirstName(person.firstName, (err, person) => console.log(err, person[0]._id, person[0].firstName))
});

module.exports = {
  PersonCb: Person,
  Post: Post,
}
