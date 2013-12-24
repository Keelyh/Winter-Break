var models = require("../models.js");

exports.first = function(req, res){
  models.School.find({}).exec(function (err, schools){
    console.log(schools);
    res.render('add_image', { title: 'College List' , schools: schools});
  })
}