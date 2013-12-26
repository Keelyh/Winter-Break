var models = require("../models.js");

exports.first = function(req, res){
  models.School.find({}).populate('_buildings').exec(function (err, schools){
    res.render('add_image', { title: 'College List' , schools: schools});
  })
}