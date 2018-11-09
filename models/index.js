const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('pages', {
  title: {
    type: Sequelize.STRING,
  },
  slug: {
    type: Sequelize.STRING,
  },
  content: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
});

//authenticating database inside the index.js file, not sure if this is best practice
db.authenticate().then(() => {
  console.log('connected to the database');
});

module.exports = { Page, User };
