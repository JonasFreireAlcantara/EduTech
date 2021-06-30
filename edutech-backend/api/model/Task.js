var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var task = new Schema({
  name : String,
  description: String,
  startDate: Date,
  dueDate: Date,
  icon: {type: ObjectId, ref:'fs.files'},
  label: {type: ObjectId, ref: 'Label'},
  toDos: [{type: ObjectId, ref: 'ToDoItem'}],
  column: {type: ObjectId, ref: 'Column'},
  columnIndex: Number
}, {
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `toObject()` output includes virtuals
});
task.virtual('iconchunk', {
  ref: 'fs.chunks', // The model to use
  localField: 'icon', // Find people where `localField`
  foreignField: 'files_id', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});

module.exports = mongoose.model('Task', task);