const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');

router.get('/', async (req, res, next) => {
  try {
    //res.send('wiki get request worked');
    res.redirect('/wiki');
  } catch (err) {
    console.error(err.message);
  }
});
router.post('/', async (req, res, next) => {
  try {
    res.send('wiki post response worked');
  } catch (err) {
    console.error(err.message);
  }
});
router.get('/add', async (req, res, next) => {
  try {
    res.send(addPage());
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
