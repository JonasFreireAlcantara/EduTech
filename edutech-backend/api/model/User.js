var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  token: String,
  name : String,
  email: String,
  photo: String
});

module.exports = mongoose.model('User', user);