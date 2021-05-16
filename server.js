const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");

const sequelize = require("./database");
const Property = require("./model/Property");

sequelize.sync().then(() => console.log("db is ready"));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/css", express.static(__dirname + "/css"));
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/upload", upload.single("csvFile"), (req, res) => {
	fs.createReadStream(req.file.destination + req.file.originalname)
		.pipe(csv())
		.on("data", async (data) => {
			let obj = {};
			for (let key in data) {
				if (parseInt(data["Annual Rent"]) < 1300000) {
					continue;
				} else {
					return await Property.create(data);
				}
			}
		})
		.on("end", () => {
			console.log("end");
		});
	res.render("index");
});

async function getProperty(filterBy = null) {
	const sqAtt = {
		order: ["Lease Type"],
		attributes: [
			"Property Name",
			"City",
			"Tenant Name",
			"Lease Type",
			"Unit Sqft",
		],

		raw: true,
	};
	if (filterBy) {
		sqAtt.where = { "Unit Sqft": filterBy };
	}
	return await Property.findAll(sqAtt);
}

app.get("/list", async (req, res) => {
	const properties = await getProperty();
	res.render("list", {
		properties,
	});
});

app.post("/list", async (req, res) => {
	const properties = await getProperty(req.body.filterBy);
	res.render("list", {
		properties,
	});
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
