import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

// import Db from '../db';
import {
  PersonCb,
  PostCb,
} from '../db/cb';

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'Blog post',
  fields () {
    return {
      id: {
        type: GraphQLString,
        resolve (post) {
          return post._id;
        }
      },
      title: {
        type: GraphQLString,
        resolve (post) {
          return post.title;
        }
      },
      content: {
        type: GraphQLString,
        resolve (post) {
          return post.content;
        }
      },
      person: {
        type: Person,
        resolve (post) {
          return post.person;
        }
      }
    };
  }
});

const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'This represents a Person',
  fields: () => {
    return {
      id: {
        type: GraphQLString,
        resolve (person) {
          return person._id;
        }
      },
      firstName: {
        type: GraphQLString,
        resolve (person) {
          return person.firstName;
        }
      },
      lastName: {
        type: GraphQLString,
        resolve (person) {
          return person.lastName;
        }
      },
      email: {
        type: GraphQLString,
        resolve (person) {
          return person.email;
        }
      },
      posts: {
        type: new GraphQLList(Post),
        resolve (person) {
          return new Promise((resolve, reject) => {
            PostCb.find({ person: { _id: person._id }}, (err, data) => {
              if (err) {
                console.log(err)
                reject(err)
              }
              console.log(data)
              resolve(data);
            });
          })
        }
      }
    };
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      people: {
        type: new GraphQLList(Person),
        args: {
          id: {
            type: GraphQLInt
          },
          email: {
            type: GraphQLString
          }
        },
        resolve (root, args) {
          return new Promise((resolve, reject) => {
            PersonCb.find(args, (err, data) => {
              if (err) {
                console.log(err)
                reject(err)
              }
              resolve(data);
            });
          })
        }
      },
      posts: {
        type: new GraphQLList(Post),
        resolve (root, args) {
          return new Promise((resolve, reject) => {
            PostCb.find(args, (err, data) => {
              if (err) {
                console.log(err)
                reject(err)
              }
              resolve(data);
            });
          })
        }
      }
    };
  }
});
//
// const Mutation = new GraphQLObjectType({
//   name: 'Mutations',
//   description: 'Functions to set stuff',
//   fields () {
//     return {
//       addPerson: {
//         type: Person,
//         args: {
//           firstName: {
//             type: new GraphQLNonNull(GraphQLString)
//           },
//           lastName: {
//             type: new GraphQLNonNull(GraphQLString)
//           },
//           email: {
//             type: new GraphQLNonNull(GraphQLString)
//           }
//         },
//         resolve (source, args) {
//           return Db.models.person.create({
//             firstName: args.firstName,
//             lastName: args.lastName,
//             email: args.email.toLowerCase()
//           });
//         }
//       }
//     };
//   }
// });

const Schema = new GraphQLSchema({
  query: Query,
  // mutation: Mutation
});

export default Schema;
