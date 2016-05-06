var express = require("express"),
	path = require("path"),
	bodyParser = require('body-parser'),
	mongodb = require("mongodb"),
	ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create database variable outside database connection callback
// to reuse connection pool in app
var db;

// Connect to database before starting app server
mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
	if (err) {
		console.log(err);
		process.exit(1);
	}

	// Save database object from callback for reuse
	db = database;
	console.log("Databse connection ready");

	// Initialize app
	var server = app.listen(process.env.PORT || 8080, function() {
		var port = server.address().port;
		console.log("App now running on port", port);
	});
});

// CONTACTS API ROUTES BELOW