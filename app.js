const morgan = require('morgan');
const express = require('express');
const path = require('path');
const layout = require('./views/layout');
const { models } = require('./models/index'); //activates our database
const wikiRoutes = require('./routes/wikiRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.urlencoded({ extended: false }));
//setting up our url..extended??
app.use(express.static(path.join(__dirname, 'public')));
//this allows navigation on windows and mac/ linux shizz
app.use(morgan('dev'));
//calling development on morgan so we see a development version of morgan
app.use('/wiki', wikiRoutes);
app.use('/user', userRoutes);
app.get('/', (req, res, next) => {
  res.send(layout(''));
});

const PORT = 1337;
//trying to be on the same path as the workshop with sync calls and listen calls
async function syncDb() {
  try {
    await models.db.sync({ force: true })
  }
  catch (err) {
    console.error(err.message)
  }

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

syncDb()


