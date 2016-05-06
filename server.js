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

// Generic error handler used by all endpoints
function handlerError(res, reason, message, code) {
	console.log("ERROR: " + reason);
	res.status(code || 500).json({"error": message});
}

/* "/contacts"
	GET: finds all contacts
	POST: creates new contact
 */

app.get("/contacts", function(req, res) {
	// body...
});

app.post("/contacts", function(req, res) {
	var newContact = req.body;
	newContact.createDate = new Date();

	if (!(req.body.firstName || req.body.lastName)) {
		handlerError(res, "Invalid user input", "Must provide a first or last name.", 400);
	}

	db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
		if (err) {
			handlerError(res, err.message, "Failed to create new contact.");
		} else {
			res.status(201).json(doc.ops[0]);
		}
	});
});

/* "/contacts/:id"
	GET: find contact by id
	PUT: update contact by id
	DELETE: delete contact by id
 */

app.get("/contacts/:id", function(req, res) {
	// body...
});

app.put("/contacts/:id", function(req, res) {
	// body...
});

app.delete("/contacts/:id", function(req, res) {
	// body...
});