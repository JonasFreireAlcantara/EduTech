var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var fschunks = new Schema({
    files_id: {type: ObjectId, ref:'fs.files'},
    n : Number,
    data : Buffer
  });
  
  module.exports = mongoose.model('fs.chunks', fschunks);