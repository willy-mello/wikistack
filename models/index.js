const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

const Page = db.define('pages', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'closed',
  },
});

Page.beforeValidate((userInstance, optionsObject) => {
  userInstance.slug = userInstance.title
    .replace(/\s+/g, '_')
    .replace(/\W/g, '');
});

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

//authenticating database inside the index.js file, not sure if this is best practice
db.authenticate().then(() => {
  console.log('connected to the database');
});

module.exports = { Page, User };
