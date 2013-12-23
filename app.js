
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
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

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
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'SECRET' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
});

// facebook stat
passport.use(new FacebookStrategy({
        clientID: 1439095322970958,
        clientSecret: "0e6f65f04ef98f8f1b08c2770a213c22",
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            user.getUserByFacebookID_TEST(profile._json.id, profile._json.name, function(returnedData) {
                console.log(returnedData);
                if(returnedData === true) {
                    done(null, user);
                } else {
                    var location = "";
                    if(profile._json.location) {
                        location = profile._json.location.name;
                    }
                    user.addUserByFacebookID(profile._json.id,profile._json.name,location, function(resultData) {
                        if(resultData === true) {
                            return done(null, user);
                        } else {
                            return done(resultData);

                        }
                    });

                }
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
        failureRedirect: '#/login' }));


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var auth = function(req, res, next) {
    if (!req.isAuthenticated())
        res.send(401); else next();
};

// this simple thing is what constitutes my REST API!
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

app.get('/api/users', user.list);
app.post('/api/addUser', auth, user.addUser);
app.get('/api/users/:id', user.getUserByID);

app.get('/api/ratings/:id', rating.findRatingsForStockID);
app.post('/api/ratings', auth, rating.addRatingForPlaceID);
app.get('/api/getRatingByUser/:userID', rating.findRatingsByUserID);

app.get('/api/stocks/:id', stocks.findStockByID);
app.post('/api/stocks', auth, stocks.addStock);
app.get('/api/getAllStocks', stocks.findAllStocks);

app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});
app.post('/login', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
});
app.post('/logout', function(req, res){
    req.logOut(); res.send(200);
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
