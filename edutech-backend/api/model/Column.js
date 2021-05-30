var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var column = new Schema({
  name : String
});

module.exports = mongoose.model('Column', column);