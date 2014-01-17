var models = require("../models.js");

exports.addSchool = function(req, res){
  res.render('addSchool', { title: 'College List', user:req.session.user});
}

exports.page = function(req, res){
  console.log(req.body.school);
  res.redirect('/')
}

exports.viewSchool = function(req, res){

  // console.log(req.params.school);
  models.School.findOne({name:req.params.school}).populate('_buildings').exec(function (err, school){
    // console.log(school);
    res.render('viewSchool', { title: 'College List', user:req.session.user, school:school});
  });
}


exports.edit = function(req,res){
  models.School.findOne({name:req.params.school}).exec(function (err, school){
    // console.log(school);
    res.render('editSchool', { title: 'College List', user:req.session.user, school:school});
  });
}

exports.saveChanges = function(req,res){
  // console.log(req.body);
  models.School.update( {name:req.body.editSchool.name},
                        {$set: {est:req.body.editSchool.est,
                          students:req.body.editSchool.students,
                          ratio:req.body.editSchool.ratio}}).exec(function (err, user){
        console.log(req.body.editSchool.name, "updated");
    res.send({redirect: '/schoolPage/'+req.body.editSchool.name});
  })
}

exports.saveNewSchool = function(req,res){
  console.log(req.body);
  models.SchoolList.update({}, {$push: {schools:req.body.newSchool.name}}).exec(function (err, numAffected, raw){
    console.log("Updated");
  });
  var newSchool = new models.School({name: req.body.newSchool.name,
                                      est:req.body.newSchool.est,
                                      students:req.body.newSchool.students,
                                      ratio:req.body.newSchool.ratio,
                                      picture: req.body.newSchool.picture})
    newSchool.save(function(err){
      if (err) return ("error saving Olin", err);
      else {
        console.log('New School saved');
        res.send({redirect: '/addSchool'});
      }
    });
}

exports.deleteSchool = function(req,res){
  console.log(req.body);
  models.School.remove({name:req.body.school}).exec(function (err, user){
    console.log(req.body.school, "Removed");
    res.send({redirect: '/collegeList'});
  })
}

exports.addBuilding = function(req, res){
  console.log(req.params.school);
  res.render("addBuilding", {title: "Add Building", user:req.session.user, school: req.params.school});
}

exports.saveNewBuilding = function(req,res){
  console.log(req.body);
  var newBuilding = new models.Building({name: req.body.newBuilding.name,
                                      type:req.body.newBuilding.type,
                                      picture: req.body.newBuilding.picture})
  newBuilding.save(function(err){
    if (err) return ("error saving Building", err);
    else {
      console.log('New School saved');
    }
  });
  models.School.update({name:req.body.school},
    {$push: {_buildings:newBuilding}})
  .exec(function (err, numAffected, raw){
      res.send({redirect: '/addBuilding/'+req.body.school});
  })
}

exports.building = function(req,res){
  console.log(req.params.building);
  models.Building.findOne({name:req.params.building}).populate('_photos _comments.user').exec(function (err, building){
    console.log(building);
    res.render('viewBuilding', { title: 'College List', user:req.session.user, building:building});
  });
}

exports.saveNewPicture = function(req,res){
  models.Building.findOne({name:req.body.newPicture.building}).exec(function (err, building){
    models.School.findOne({name:req.body.newPicture.location}).exec(function (err, school){
      var saveNewPicture = new models.Photo({picture: req.body.newPicture.picture,
            // user: ,
            caption: req.body.newPicture.caption,
            location: school,
            building: building})
      saveNewPicture.save(function(err){
      if (err) return ("error saving Building", err);
      else {
        models.Building.update({name:req.body.newPicture.building},
          {$push: {_photos:saveNewPicture}})
            .exec(function (err, numAffected, raw){
              res.send({redirect: '/addPhoto'});
        })
      }
      });
    })
  })
}

exports.addComment = function(req,res){
  console.log(req.body);
  console.log(req.session.user);
  models.User.findOne({_id:req.session.user._id}).exec(function (err, poster) {
    models.Building.update({name:req.body.building},
      {$push: {_comments:{comment:req.body.comment, user:poster}}})
        .exec(function (err, numAffected, raw){
          // res.send({redirect: '/viewBuilding'});
    })
  })
}