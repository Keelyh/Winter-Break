var models = require("../models.js");

exports.disp = function(req, res){
  models.School.find({}).exec(function (err, schools){
    models.SchoolList.find({}).exec(function (err, schoolList){
      res.render('collegeList', { title: 'College List', user:req.session.user, schools:schools});
    })
  })
}