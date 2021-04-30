"use strict";
const ObjectId = require("mongodb").ObjectID;


module.exports = function (app, db) {
	//Index page (static HTML)
	app.route("/").get(function (req, res) {
		res.sendFile(process.cwd() + "/views/index.html");
	});
  
	app
		.route("/api/stock-prices")
		.get(function (req, res) {});
};
