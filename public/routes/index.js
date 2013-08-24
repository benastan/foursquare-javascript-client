
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log(req);
  res.render('index', { title: 'Express' });
};

exports.redirect = function(req, res) {
  res.send('Authenticated...');
};
