var models = require("../models.js");
var bcrypt = require('bcrypt');
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.signin = function(req, res){
  res.render('signin', {title: 'Collage'});
}

exports.signup = function(req, res){
  res.render('signup', {title: 'Collage'});
}

exports.login = function(req,res){
  console.log("login");
  models.User.find({name: req.body.username}).exec(function(err, user){
    if (err) throw err;
    if (user.length == 0){
      res.send({verified: false});
    } else {
      console.log("user");
      var rightEnteredPassword = user[0].password;
      var success  = bcrypt.compareSync(req.body.uncryptpass, rightEnteredPassword);
      if (success) {
        req.session.user = user[0];
        res.send({redirect: '/'});
      } else {
        req.flash('warning', 'Username/password incorrect');
        res.send({redirect: '/signin'});
      }
    }
  });
}

exports.create = function(req, res){
  var hashedPassword = bcrypt.hashSync(req.body.uncryptpass, 10);
  var new_user = new models.User({name: req.body.username, password: hashedPassword, approved: false, tab:0, admin:false, _orders:[], isguest:false});
  new_user.save(function(err){
    if (err) return console.log("error while saving new user" + req.body.username, err);
    req.session.user = new_user;
    res.send({redirect: '/'});
  });
}

exports.profile =function(req, res){
  models.User.findOne({_id:req.session.user._id}).populate('_followSchools _followPeople').exec(function (err, user) {
    res.render('profile', {title: "Collage", user:user})
  })
}

exports.followSchool = function(req, res){
  console.log(req.body.school);
  models.School.findOne({name:req.body.school}).exec(function (err, school) {
    console.log("SCHOOL: ", school);
    models.User.update({_id:req.session.user._id},
      {$push: {_followSchools:school}})
        .exec(function (err, numAffected, raw){
          // res.send({redirect: '/viewBuilding'});
    })
  })
}

exports.profilePic = function (req, res){
  models.User.update({name: req.session.user.name}, {$set: {picture: req.body.profilePic}}).exec(function (err, numAffected, raw){
    res.send({redirect: '/profile'});
  });
}

exports.logout = function(req,res){
  delete req.session.user;
  res.redirect('/');
}