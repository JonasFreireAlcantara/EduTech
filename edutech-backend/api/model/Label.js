var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var label = new Schema({
  name : String,
  labelColor: {type: String, default: "#cccccc"}
});

module.exports = mongoose.model('Label', label);