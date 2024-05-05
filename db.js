const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // Adjust based on your database dialect (e.g., 'postgres')
  logging: false, // Set to true for debugging
});

module.exports = sequelize;
