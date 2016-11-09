import couchbase from 'couchbase';
const cluster = new couchbase.Cluster('couchbase://172.18.0.2');
const bucket = cluster.openBucket('users');
import ottoman from 'ottoman';
ottoman.bucket = bucket;


const SpatialQuery = couchbase.SpatialQuery;
const query = SpatialQuery.from('dev_place_loc', 'place_by_location').bbox([-100,-100,100,100]).limit(10);
bucket.query(query, function(err, results) {
  if (err) {
    console.log('Error', err)
  } else {
    console.log('RES', results);
    results.forEach(result => {
      console.log(result.key);
      console.log(result.geometry);
      console.log(result.id);
      console.log(result.value);
      console.log('-----------')
    })
  }
});
