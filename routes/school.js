var models = require("../models.js");

exports.addSchool = function(req, res){
  console.log("KEELY");
  // res.send("KEEly");
  res.render('addSchool', { title: 'College List'});
}

exports.page = function(req, res){
  console.log(req.body.school);
  res.redirect('/')
}

exports.viewSchool = function(req, res){

  // console.log(req.params.school);
  models.School.findOne({name:req.params.school}).exec(function (err, school){
    // console.log(school);
    res.render('viewSchool', { title: 'College List', school:school});
  });
}


exports.edit = function(req,res){
  models.School.findOne({name:req.params.school}).exec(function (err, school){
    // console.log(school);
    res.render('editSchool', { title: 'College List', school:school});
  });
}

exports.saveChanges = function(req,res){
  // console.log(req.body);
  models.School.update( {name:req.body.editSchool.name},
                        {$set: {est:req.body.editSchool.est,
                          students:req.body.editSchool.students,
                          ratio:req.body.editSchool.ratio}}).exec(function (err, user){
        console.log(req.body.editSchool.name, "updated");
    res.redirect('/collegeList');

  })
}

exports.saveNewSchool = function(req,res){
  console.log(req.body);
  var newSchool = new models.School({name: req.body.newSchool.name,
                                      est:req.body.newSchool.est,
                                      students:req.body.newSchool.students,
                                      ratio:req.body.newSchool.ratio,
                                      picture: req.body.newSchool.picture})
    newSchool.save(function(err){
      if (err) return ("error saving Olin", err);
      else {
        res.send({redirect: '/addSchool'});
        console.log('New School saved');
      }
    });
  // res.redirect('/addSchool');
}

exports.deleteSchool = function(req,res){
  console.log(req.body);
  models.School.remove({name:req.body.school}).exec(function (err, user){
    console.log(req.body.school, "Removed");
  })
}

exports.addBuilding = function(req, res){
  console.log(req.query);
  res.send("HEYL");
}