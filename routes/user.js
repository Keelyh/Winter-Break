var models = require("../models.js");
var bcrypt = require('bcrypt');
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.signin = function(req, res){
    res.render('signin', {title: 'Shwastinator'});
}

exports.signup = function(req, res){
    res.render('signup', {title: 'Shwastinator'});
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