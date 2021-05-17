var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var task = new Schema({
  name : String,
  description: String,
  startDate: Date,
  dueDate: Date,
  icon: Buffer,
  label: {type: ObjectId, ref: 'Label'},
  toDos: [{type: ObjectId, ref: 'ToDoItem'}],
  column: {type: ObjectId, ref: 'Column'}
});

module.exports = mongoose.model('Task', task);