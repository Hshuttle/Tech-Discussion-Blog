const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogEntry = require('./blogEntry.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogEntry) {
    await Blog.create({
      ...blog,
      userId: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
