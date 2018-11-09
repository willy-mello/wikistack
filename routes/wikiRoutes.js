const express = require('express');
const router = express.Router();
const path = require('path');
const addPage = require('../views/addPage');
const wikipage = require('../views/wikipage');
const models = require('../models/index');
const main = require('../views/main');

const Page = models.Page;
const User = models.User



router.get('/', async (req, res, next) => {
  try {
    const allPages = await Page.findAll()
    res.send(main(allPages));
  }
  catch (err) { next(err) }
});
router.post('/', async (req, res, next) => {
  try {
    // To-do: put logic to prevent creating a page named "add"

    const author = req.body.name;
    const email = req.body.email;
    const [user, wasCreated] = await User.findOrCreate({ where: { name: author, email: email } })

    const page = await Page.create(req.body);
    page.setAuthor(user)
    // console.log(page);
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
