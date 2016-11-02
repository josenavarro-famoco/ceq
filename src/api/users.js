import express from 'express';
const router = express.Router();

import UserModel from '../db/schemas/user';

router.get('/', (req, res) => {
  UserModel.find({}, function(error, result) {
    if(error) {
        console.log("An error happened -> " + JSON.stringify(error));
        res.json(error);
    }
    // Do something with the resulting Ottoman models
    res.json(result);
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  console.log(body);
  const user = new UserModel(body);
  user.save((error, data) => {
    if (error) {
      res.json(error);
    }
    console.log(data);
    res.json(data);
  })
});

export default router;
