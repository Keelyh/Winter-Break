
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log(req.session.user);
  res.render('index', { title: 'Express', user:req.session.user});
};