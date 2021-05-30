const userModel = require('../model/User');
const workspaceModel = require('../model/Workspace');
const taskModel = require('../model/Task');
const columnModel = require('../model/Column');
const labelModel = require('../model/Label');
const toDoItemModel = require('../model/ToDoItem');
const pomodoroModel = require('../model/Pomodoro');

// CRUD User ############################################
exports.getUser = function (req, res, next) {
  userModel.findOne({email: req.params.email}).then(function(user){
    res.send(user);
  }).catch(next);;
};

exports.createUser = function (req, res, next) {
  userModel.exists({email: req.body.email}).then(function(result) {
    if (!result) {
      userModel.create(req.body).then(function(user){
        res.send(user);
      }).catch(next);
    } else {
      res.send({
        error: "Email já registrado!"
      });
    }
  }).catch(next);;

  
};

exports.updateUser = function (req, res, next) {
  userModel.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    userModel.findOne({_id: req.params.id}).then(function(user){
      res.send(user);
    });
  }).catch(next);
};

//exports.deleteUser = function (req, res) {
//  userCreate.findByIdAndRemove({_id: req.params.id}).then(function(user){
//    res.send(user);
//  }).catch(next);
//};

//exports.getAllUser = function (req, res) {
//  userModel.find({}).then(function(users){
//    userModel.send(users);
//  });
//};

// CRUD Workspace ############################################

exports.getWorkspaceById = function (req, res, next) {
  workspaceModel.findOne({_id: req.params.id}).then(function(workspace){
    res.send(workspace);
  }).catch(next);
};

exports.getWorkspaceByOwnerId = function (req, res, next) {
  workspaceModel.find({owner: req.params.ownerId}).then(function(workspace){
    res.send(workspace);
  }).catch(next);
};

exports.createWorkspace = function (req, res, next) {
  workspaceModel.create(req.body).then(function(workspace){
    res.send(workspace);
  }).catch(next);
};

exports.updateWorkspace = function (req, res, next) {
  workspaceModel.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    workspaceModel.findOne({_id: req.params.id}).then(function(workspace){
      res.send(workspace);
    });
  }).catch(next);
};

exports.deleteWorkspace = function (req, res, next) {
  workspaceModel.findByIdAndRemove({_id: req.params.id}).then(function(workspace){
    res.send(workspace);
  }).catch(next);
};

// CRUD Task ############################################

exports.getTask = function (req, res, next) {
  taskModel.findOne({_id: req.params.id}).then(function(task){
    res.send(task);
  }).catch(next);
};

exports.createTask = function (req, res, next) {
  taskModel.create(req.body).then(function(task){
    res.send(task);
  }).catch(next);
};

exports.updateTask = function (req, res, next) {
  taskModel.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    taskModel.findOne({_id: req.params.id}).then(function(task){
      res.send(task);
    });
  }).catch(next);
};

exports.deleteTask = function (req, res, next) {
  taskModel.findByIdAndRemove({_id: req.params.id}).then(function(task){
    res.send(task);
  }).catch(next);
};

// CRUD Column ############################################

exports.getColumn = function (req, res, next) {
  columnModel.findOne({_id: req.params.id}).then(function(column){
    res.send(column);
  }).catch(next);
};

exports.createColumn = function (req, res, next) {
  columnModel.create(req.body).then(function(column){
    res.send(column);
  }).catch(next);
};

exports.updateColumn = function (req, res, next) {
  columnModel.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    columnModel.findOne({_id: req.params.id}).then(function(column){
      res.send(column);
    });
  }).catch(next);
};

exports.deleteColumn = function (req, res, next) {
  columnModel.findByIdAndRemove({_id: req.params.id}).then(function(column){
    res.send(column);
  }).catch(next);
};

// CRUD Label ############################################

exports.getLabel = function (req, res, next) {
  labelModel.findOne({_id: req.params.id}).then(function(label){
    res.send(label);
  }).catch(next);
};

exports.createLabel = function (req, res, next) {
  labelModel.create(req.body).then(function(label){
    res.send(label);
  }).catch(next);
};

exports.updateLabel = function (req, res, next) {
  labelModel.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    labelModel.findOne({_id: req.params.id}).then(function(label){
      res.send(label);
    });
  }).catch(next);
};

exports.deleteLabel = function (req, res, next) {
  labelModel.findByIdAndRemove({_id: req.params.id}).then(function(label){
    res.send(label);
  }).catch(next);
};

// CRUD ToDoItem ############################################

exports.getTodoItem = function (req, res, next) {
  toDoItemModel.findOne({_id: req.params.id}).then(function(toDoItem){
    res.send(toDoItem);
  }).catch(next);
};

exports.createTodoItem = function (req, res, next) {
  toDoItemModel.create(req.body).then(function(toDoItem){
    res.send(toDoItem);
  }).catch(next);
};

exports.updateTodoItem = function (req, res, next) {
  toDoItemModel.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    toDoItemModel.findOne({_id: req.params.id}).then(function(toDoItem){
      res.send(toDoItem);
    });
  }).catch(next);
};

exports.deleteTodoItem = function (req, res, next) {
  toDoItemModel.findByIdAndRemove({_id: req.params.id}).then(function(toDoItem){
    res.send(toDoItem);
  }).catch(next);
};

// CRUD Pomodoro ############################################

exports.getPomodoro = function (req, res, next) {
  pomodoroModel.findOne({_id: req.params.id}).then(function(pomodoro){
    res.send(pomodoro);
  }).catch(next);
};

exports.createPomodoro = function (req, res, next) {
  pomodoroModel.create(req.body).then(function(pomodoro){
    res.send(pomodoro);
  }).catch(next);
};

exports.updatePomodoro = function (req, res, next) {
  pomodoroModel.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    pomodoroModel.findOne({_id: req.params.id}).then(function(pomodoro){
      res.send(pomodoro);
    });
  }).catch(next);
};

exports.deletePomodoro = function (req, res, next) {
  pomodoroModel.findByIdAndRemove({_id: req.params.id}).then(function(pomodoro){
    res.send(pomodoro);
  }).catch(next);
};