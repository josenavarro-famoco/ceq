import express from 'express';
const router = express.Router();

import users from './users';

router.use('/users', users);

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
