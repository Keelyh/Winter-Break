
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , development = require('./routes/development')
  , mongoose = require('mongoose')
  , school = require('./routes/school')
  , photo = require('./routes/photo')
  , cl = require('./routes/collegelist')
  , models = require('./models');
var http = require('http');
var path = require('path');

var app = express();

var uristring =
  process.env.MONGODB_URI ||
  process.env.MONGOLAB_URI ||
  'mongodb://localhost/collage';
var mongoOptions = { db: { safe: true }};

mongoose.connect(uristring, mongoOptions, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connecting to:' + uristring + '.');
  }
});

// all environments
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  // app.use(express.favicon(__dirname + "/public/images/favicon.png"));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));


});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function checkLoggedIn() {
  return function(req, res, next) {
    if (!req.session.user){
      res.render('signin', {title: 'Sign In'});
    } else {
      next();
    };
  }
}

app.get('/', checkLoggedIn(), routes.index);
app.get('/users', user.list);
app.get('/dev', development.populate);
app.get('/collegeList', checkLoggedIn(), cl.disp);
app.get('/addPhoto', checkLoggedIn(), photo.first);
app.get('/addSchool', checkLoggedIn(), school.addSchool);
app.post('/schoolPage', school.page);
app.get('/schoolPage/:school', checkLoggedIn(), school.viewSchool);
app.get('/schoolPage/:school/edit', checkLoggedIn(), school.edit);
app.post('/saveSchool', school.saveChanges);
app.post('/saveNewSchool', school.saveNewSchool);
app.post('/deleteSchool', school.deleteSchool);
app.get('/testing', development.testing);
app.get('/addBuilding/:school', checkLoggedIn(), school.addBuilding);
app.post('/saveNewBuilding', checkLoggedIn(), school.saveNewBuilding);
app.get('/building/:building', checkLoggedIn(), school.building);
app.post('/saveNewPicture', school.saveNewPicture);
app.post('/addComment', school.addComment);
app.get('/signup', user.signup);
app.get('/signin', user.signin);
app.post('/verify', user.login);
app.post('/newUser', user.create);
app.get('/profile', checkLoggedIn(), user.profile);
app.post('/followSchool', user.followSchool);
app.post('/profilePic', user.profilePic);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

