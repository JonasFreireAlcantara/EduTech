var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var workspace = new Schema({
  name: String,
  description : String,
  owner: {type: ObjectId, ref: 'User'},
  icon: {type: ObjectId, ref:'fs.files'},
  lastAccess: Date,
  tasks: [{type: ObjectId, ref: 'Task'}],
  pomodoros: [{type: ObjectId, ref: 'Pomodoro'}],
  columns: [{type: ObjectId, ref: 'Column'}]
}, {
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `toObject()` output includes virtuals
});
workspace.virtual('iconchunk', {
  ref: 'fs.chunks', // The model to use
  localField: 'icon', // Find people where `localField`
  foreignField: 'files_id', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: true
});

module.exports = mongoose.model('Workspace', workspace);