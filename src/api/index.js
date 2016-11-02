import express from 'express';
const router = express.Router();

import users from './users';
import places from './places';

router.use('/users', users);
router.use('/places', places);

router.get('/', (req, res) => {
  res.json({
    title: 'index',
    body: 'body',
  });
});

router.post('/', (req, res) => {
  console.log(req.body)
  res.json({
    title: 'post',
    body: 'c',
  });
});

export default router;
