// VARIABLES to DEPENDENCIES in the package.json
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://user1:monguse53@ds053429.mongolab.com:53429/tasksdb'); // add login
var jade = require('jade');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());


// Sets up schema type for mongoose

var Schema = mongoose.Schema;
  //, ObjectId = Schema.ObjectId;

var TaskSchema = new Schema({
	title     : String
  , body      : String
  //, date      : Date
});

var TaskModel = mongoose.model('task', TaskSchema);


// Gets list

app.get('/', function (req, res) {
	res.send('To-Do List');
}); // TEST by typing "nodemon app.js in terminal, then go to browser (localhost:3000)"

app.set('views', __dirname + '/templates');
// add body parser
// add method overwrite


// CRUD TaskItems
// INDEX

// NEW  
// GET /tasks/new  <-- new form, shows empty form to user
app.get('/tasks/new', function (req, res){
	res.render('tasks/new.jade');
});


// CREATE 
// POST /tasks  <-- allows user to post task item in form field, server receives, then sends to DB 
app.post('/tasks', function (req, res){
	var task = new TaskModel(); // instantiate new TaskModel
	task.title = req.param('title');
	task.body = req.param('body');
	task.save(function(err, t){
		// this executes when task completes saving to DB
		if(err) res.send(500, err); // error handling

		res.redirect('/'); // successful save
	});
});



// GET / gets ALL tasks 
// GET /tasks #TODO  <-- server gets data from DB (mongo DB), displays all tasks on redirected page




// SHOW / gets ONE task 
// GET /tasks/:id  <-- server gets data from DB, displays single task on new page






// EDIT / EDIT --> UPDATE similar to NEW --> CREATE
// GET /tasks/:id/edit 




// UPDATE
// PUT /tasks/:id






// DELETE
// DEL /tasks/:id





app.listen(3000);
