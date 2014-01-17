var models = require("../models.js");
var bcrypt = require('bcrypt');

exports.populate = function(req, res){
    // this is to populate the database for development
    var hashedk = bcrypt.hashSync("keely", 10);
    var keely = new models.User({name: "Keely", password: hashedk, picture: "/images/keely.jpg"});
    keely.save(function(err){
        if (err) return ("error saving Keely", err);
        console.log('Keely saved');
    });
    var olin = new models.School({name: "Olin College", est:1997, students:300,
                    ratio: "9 to 1", picture: "/images/olin.jpg"})
    olin.save(function(err){
        if (err) return ("error saving Olin", err);
        console.log('Olin saved');
    });
    // var list = new models.SchoolList({schools:[{schoolName:'Olin College'}]})
    // list.save(function(err){
    //     if (err) return ("error saving Olin", err);
    //     console.log('Olin saved');
    // });

    // var scripps = new models.School({name: "Scripps College", est:1926, students:950,
    //                 ratio: "9 to 1", picture: "/images/scripps.jpg"})
    // scripps.save(function(err){
    //     if (err) return ("error saving Olin", err);
    //     console.log('scripps saved');
    // });
    res.send("populated");
}

exports.testing = function(req,res) {
    res.render('testing', {title:"collage"});
}