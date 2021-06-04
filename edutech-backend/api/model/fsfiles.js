var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fsfiles = new Schema({
    length: Number,
    chunkSize : Number,
    uploadDate : Date,
    filename : String,
    md5 : String,
    contentType : String
  });
  
  module.exports = mongoose.model('fs.files', fsfiles);