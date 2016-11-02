// Instantiate Couchbase and Ottoman
import ottoman from 'ottoman';
import couchbase  from 'couchbase';

// Build my cluster object and open a new cluster
const cluster = new couchbase.Cluster('couchbase://172.18.0.2');
const usersBucket = cluster.openBucket('users');
ottoman.bucket = usersBucket;

// Build my "schema" from my model files
require('./schemas/user');

// Build the necessary indexes to function
ottoman.ensureIndices(function(err) {
  if (err) {
    console.log('DB failed to created neccessary indices', err);
    return;
  }
  console.log('DB ottoman indices are ready for use!');

});
