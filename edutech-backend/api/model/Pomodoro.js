var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pomodoro = new Schema({
  StartingMinutes : Number,
  StartingSeconds : Number,
  RemainingMinutes: Number,
  RemainingSeconds: Number,
  CreatedOn: Date,
  EndedOn: Date
});

module.exports = mongoose.model('Pomodoro', pomodoro);