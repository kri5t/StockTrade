
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var rating = require('./routes/rating');
var stocks = require('./routes/stocks');
var http = require('http');
var path = require('path');
var passport = require('passport');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view options', {
    layout: false
});

//Configuration
app.configure("all", function(){
	app.use(express.bodyParser());
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());

	app.use(express.cookieParser());
	app.use(express.session({ secret: 'keyboard cat' }));
//	app.use(passport.initialize());
//	app.use(passport.session());

	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// this simple thing is what constitutes my REST API!
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

app.get('/api/users', user.list);
app.post('/api/addUser', user.addUser);
app.get('/api/users/:id', user.getUserByID);

app.get('/api/ratings/:id', rating.findRatingsForStockID);
app.post('/api/ratings', rating.addRatingForPlaceID);
app.get('/api/getRatingByUser/:userID', rating.findRatingsByUserID);

app.get('/api/stocks/:id', stocks.findStockByID);
app.post('/api/stocks', stocks.addStock);
app.get('/api/getAllStocks', stocks.findAllStocks);

//var app = module.exports = express.createServer();

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
