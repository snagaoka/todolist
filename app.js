// VARIABLES to DEPENDENCIES in the package.json
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var jade = require('jade');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method')); // must be after bodyParser, allows PUT request 

app.set('views', __dirname + '/templates');
mongoose.connect('mongodb://user1:monguse53@ds053429.mongolab.com:53429/tasksdb'); // add login

// Sets up schema type for mongoose
var Schema = mongoose.Schema;
  //, ObjectId = Schema.ObjectId;

var TaskSchema = new Schema({
	title     : String
  , body      : String
  //, date      : Date
});

var TaskModel = mongoose.model('task', TaskSchema);


// CRUD TaskItems
// INDEX

// LIST / lists ALL tasks 
// GET /tasks #TODO  <-- server gets data from DB (mongo DB), displays all tasks on redirected page
app.get('/', function (req, res) {
	TaskModel.find(function (err, tasks){
		res.render('tasks/list.jade', {tasks: tasks});
	});
}); // TEST by typing "nodemon app.js" in terminal, then go to browser (localhost:3000)"


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


// SHOW / gets ONE task 
// GET /tasks/:id  <-- server gets data from DB, displays single task on new page
app.get('/tasks/:id', function (req, res){
	TaskModel.findById(req.param('id'), function (err, task){
		if(err) res.send(500, err);

		res.render('tasks/show.jade', {task: task});
	});
});


// EDIT / EDIT --> UPDATE similar to NEW --> CREATE
// GET /tasks/:id/edit 
app.get('/tasks/:id/edit', function (req, res){
	TaskModel.findById(req.param('id'), function (err, task){
		res.render('tasks/edit.jade', {task: task});
	});
});


// UPDATE
// PUT /tasks/:id
app.put('/tasks/:id', function (req, res){
	TaskModel.findById(req.param('id'), function (err, task){
		task.title = req.param('title');
		task.body = req.param('body');
		task.save(function (err, t){
			if(err) res.send(500, err);

			res.redirect('/');
		});
	});
});


// DELETE
// DEL /tasks/:id
app.del('/tasks/:id', function (req, res){
	TaskModel.findByIdAndRemove(req.param('id'), function (task){
		res.redirect('/');
	});
});






app.listen(3000);
