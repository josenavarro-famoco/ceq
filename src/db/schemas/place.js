import db from '../db.js';
import ottoman from 'ottoman';

const PlaceModel = ottoman.model("Place", {
  placeId: {type:'string', auto:'uuid', readonly:true},
  name: {type: "string"},
  address: {type: "string"},
  location: {type: "string"},
  created_at: {type: "Date", default: Date.now}
});

export default PlaceModel;
