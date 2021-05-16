const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Property extends Model {}

Property.init(
	{
		"Property Name": {
			type: DataTypes.STRING,
		},
		"Property Sqft": {
			type: DataTypes.INTEGER,
		},
		City: {
			type: DataTypes.STRING,
		},
		"Lease Number": {
			type: DataTypes.STRING,
		},
		"Lease Type": {
			type: DataTypes.STRING,
		},
		"Tenant Name": {
			type: DataTypes.STRING,
		},
		"Unit Number": {
			type: DataTypes.INTEGER,
		},
		"Unit Sqft": {
			type: DataTypes.INTEGER,
		},
		"Lease Begin Date": {
			type: DataTypes.DATE,
		},
		"Lease End Date": {
			type: DataTypes.DATE,
		},
		"Annual Rent Sqft": {
			type: DataTypes.DECIMAL,
		},
		"Annual Rent": {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		moduleName: "property",
		timestamps: false,
	}
);

module.exports = Property;
