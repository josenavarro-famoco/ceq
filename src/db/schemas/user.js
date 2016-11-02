import db from '../db.js';
import ottoman from 'ottoman';

const UserModel = ottoman.model("User", {
  userId: {type:'string', auto:'uuid', readonly:true},
  firstname: {type: "string"},
  lastname: {type: "string"},
  email: {type: "string"},
  created_at: {type: "Date", default: Date.now}
});

export default UserModel;
