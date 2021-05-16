const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test-db", "property", "pass", {
	dialect: "sqlite",
	host: "./db/property.sqlite",
});

module.exports = sequelize;
