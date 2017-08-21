var jwt = require('jsonwebtoken');
var config = require('./config');

module.exports = function (user) {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 1);

  var token = jwt.sign({
    id: user._id,
    username: user.username,
    exp: parseInt(exp.getTime())
  }, config.secret);
  
  return token;
};
