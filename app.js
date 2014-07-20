var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.send('hello world!');
});

// CRUD TaskItems

// INDEX
// GET /
// GET /tasks #TODO



// SHOW
// GET /tasks/:id



// NEW
// GET /tasks/new



// CREATE
// POST /tasks



// EDIT
// GET /tasks/:id/edit



// UPDATE
// PUT /tasks/:id



// DELETE
// DEL /tasks/:id




app.listen(3000);
