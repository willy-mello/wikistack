const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.send('wiki get request worked')
  }
  catch (err) { console.error(err.message) }
})
router.post('/', async (req, res, next) => {
  try {
    res.send('wiki post response worked')
  }
  catch (err) { console.error(err.message) }

})
router.get('/add', async (req, res, next) => {
  try {
    res.send('wiki add get request worked')
  }
  catch (err) { console.error(err.message) }
})

module.exports = router