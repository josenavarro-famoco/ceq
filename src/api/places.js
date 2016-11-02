import express from 'express';
const router = express.Router();

import PlaceModel from '../db/schemas/place';

router.get('/', (req, res) => {
  PlaceModel.find({}, function(error, result) {
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
  const place = new PlaceModel(body);
  user.save((error, data) => {
    if (error) {
      res.json(error);
    }
    console.log(data);
    res.json(data);
  })
});

export default router;
