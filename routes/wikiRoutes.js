const express = require('express');
const router = express.Router();
const path = require('path');
const addPage = require('../views/addPage');
const wikipage = require('../views/wikipage');
const models = require('../models/index');

const Page = models.Page;

router.get('/', async (req, res, next) => {
  try {
    //res.send('wiki get request worked');
    res.redirect('/');
  } catch (err) {
    console.error(err.message);
  }
});
router.post('/', async (req, res, next) => {
  try {
    // To-do: put logic to prevent creating a page named "add"
    const title = req.body.title;
    const content = req.body.content;
    const page = new Page({
      title: title,
      content: content,
    });
    console.log(page);
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
    // res.json(req.body)
    // res.send('wiki post response worked');
  } catch (err) {
    next(err);
  }
});
router.get('/add', async (req, res, next) => {
  try {
    res.send(addPage());
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    //res.send(`hit dynamic route at ${req.params.slug}`);
    const desiredPage = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    //res.json(desiredPage);
    res.send(wikipage(desiredPage, ''));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
