var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  token: String,
  name : String,
  email: String,
  photo: Buffer
});

module.exports = mongoose.model('User', user);