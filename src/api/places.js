import express from 'express';
const router = express.Router();

import Place, { findPlaceByBbox } from '../db/schemas/place';

router.get('/', (req, res) => {
  Place.find({}, function(error, result) {
    if(error) {
        console.log("An error happened -> " + JSON.stringify(error));
        res.json(error);
    }
    // Do something with the resulting Ottoman models
    res.json(result);
  });
});

router.get('/bbox', (req, res) => {
  const queryParams = req.query;
  if (queryParams.coordinates) {
    findPlaceByBbox(queryParams.coordinates, data => {
      res.json(data);
    });
  } else {
    res.json({ reason: 'not coordinates provided'});
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  console.log(body);
  const place = new Place(body);
  user.save((error, data) => {
    if (error) {
      res.json(error);
    }
    console.log(data);
    res.json(data);
  })
});

export default router;
