const express = require('express');
const router = express.Router();
const path = require('path')
const addPage = require('../views/addPage');
const models = require('../models/index')

const Page = models.Page


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
    const title = req.body.title;
    const content = req.body.content;
    const page= new Page({
      title: title,
      content:content
    })

    await page.save();
    res.redirect('/');
    // res.json(req.body)
    // res.send('wiki post response worked');
  } catch (err) {
    next(err)
  }
});
router.get('/add', async (req, res, next) => {
  try {
    res.send(addPage());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
