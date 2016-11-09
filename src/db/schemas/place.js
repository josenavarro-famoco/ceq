import db, { bucket } from '../db';
import ottoman from 'ottoman';
import couchbase  from 'couchbase';

const Location = ottoman.model("Location", {
  coordinates: [ { type: 'number' } ],
});

const Place = ottoman.model("Place", {
  placeId: { type:'string', auto:'uuid', readonly:true },
  name: { type: 'string' },
  address: {type: "string"},
  location: Location,
  created_at: {type: "Date", default: Date.now},
});

export default Place;

export function findPlaceByBbox(bbox, cb) {
  let coordinates = bbox;
  if (typeof bbox === 'string') {
    coordinates = bbox.split(',');
  }
  const SpatialQuery = couchbase.SpatialQuery;
  const query = SpatialQuery.from('dev_place_loc', 'place_by_location').bbox(coordinates).limit(10);
  bucket.query(query, function(err, results) {
    if (err) {
      console.log('Error', err)
      cb({ error: err });
    }
    const data = results.map(result => ({
      location: result.geometry,
      id: result.id,
    }));
    cb({ data });
  });
}
