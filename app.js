
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
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/dev', development.populate);
app.get('/collegeList', cl.disp);
app.get('/addPhoto', photo.first);
app.get('/addSchool', school.addSchool);
app.post('/schoolPage', school.page);
app.get('/schoolPage/:school', school.viewSchool);
app.get('/schoolPage/:school/edit', school.edit);
app.post('/saveSchool', school.saveChanges);
app.post('/saveNewSchool', school.saveNewSchool);
app.post('/deleteSchool', school.deleteSchool);
app.get('/testing', development.testing);
app.get('/addBuilding/:school', school.addBuilding);
app.post('/saveNewBuilding', school.saveNewBuilding);
app.get('/building/:building', school.building);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

