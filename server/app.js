var restify = require('restify');
var jade = require('jade');
var server = restify.createServer({
  //certificate: ...,
  //key: ...,
  name: 'MyApp',
});
//var html = jade.renderFile('path/to/file.jade', options);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(8080);

server.get('/', function (req, res, next) {
	var html = jade.renderFile('templates/index.jade');
	res.send(html);
});

server.post('/todo', function (req, res, next) {
	res.send("server working");
	//return next();
});

server.get('/todo/:name', function (req, res, next) {
	res.send("task");
});

server.get('/todos', function (req, res, next) {
	res.send("tasks");
});


