var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var workspace = new Schema({
  name: String,
  description : String,
  icon: Buffer,
  lastAccess: Date,
  tasks: [{type: ObjectId, ref: 'Task'}],
  pomodoros: [{type: ObjectId, ref: 'Pomodoro'}],
  columns: [{type: ObjectId, ref: 'Column'}]
});

module.exports = mongoose.model('Workspace', workspace);