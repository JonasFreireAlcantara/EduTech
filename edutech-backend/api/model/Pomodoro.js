var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pomodoro = new Schema({
  seconds : Number,
  CreatedOn: Date,
  EndedOn: Date
});

module.exports = mongoose.model('Pomodoro', pomodoro);