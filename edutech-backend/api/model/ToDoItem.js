var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var toDoItem = new Schema({
  name : String,
  isChecked: Boolean
});

module.exports = mongoose.model('ToDoItem', toDoItem);