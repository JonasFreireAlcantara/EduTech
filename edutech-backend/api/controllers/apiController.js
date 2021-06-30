const userModel = require('../model/User');
const workspaceModel = require('../model/Workspace');
const taskModel = require('../model/Task');
const columnModel = require('../model/Column');
const labelModel = require('../model/Label');
const toDoItemModel = require('../model/ToDoItem');
const pomodoroModel = require('../model/Pomodoro');
const fsFiles = require('../model/fsfiles');
const fsChunks = require('../model/fschunks');
const { isValidId } = require('../lib/utils');
const upload = require("../middleware/upload");

const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
}

// CRUD User ############################################
exports.getUser = async (req, res) => {
  const user = await userModel.findOne({email: req.params.email});
  if (!user) {
    return res.status(HTTP_STATUS_CODE.NOT_FOUND).send();
  }
  return res.send(user);
};

exports.createUser = function (req, res, next) {
  userModel.exists({email: req.body.email}).then(function(result) {
    if (!result) {
        userModel.create(req.body).then(function(user){
        res.send(user);
      }).catch(next);
    } else {
      res.status(HTTP_STATUS_CODE.CONFLICT).send({
        error: "Email já registrado!"
      });
    }
  }).catch(next);
};

exports.updateUser = async function (req, res, next) {

  const user = await userModel.findById(req.params.id)
  if (!user) {
    return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({ error: 'Usuário não encontrado'});s
  }

  userModel.findOneAndUpdate(
    {_id: req.params.id},
    req.body,
    (error, user) => {
      if (error) {
        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(error);
      }

      return res.send(user);
    }
  )

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
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({ error: 'Id Inválido' });
  }

  workspaceModel.findOne({_id: id}).populate('columns').populate('tasks').then(function(workspace){
    if (!workspace) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({ error: 'Workspace não encontrado.' })
    }
    return res.send(workspace);
  }).catch(next);
};

exports.getWorkspaceByOwnerId = function (req, res, next) {
  const { ownerId } = req.params;

  if (!isValidId(ownerId)) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({ error: 'Id Inválido' });
  }

  workspaceModel.find({owner: ownerId}).populate('columns').populate('tasks').then(function(workspace){
    if (!workspace) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({ error: 'Workspace não encontrado.' })
    }
    res.send(workspace);
  }).catch(next);
};

exports.createWorkspace = async (req, res) => {

  let workspace = await workspaceModel.findOne({ name: req.body.name });
  if (workspace) {
    return res.status(HTTP_STATUS_CODE.CONFLICT).send({ error: 'Já existe uma workspace com este nome.' });
  }
  await upload(req, res);
  if (req.file && req.file.id) {
    req.body.icon = req.file.id;
  }
  workspace = await workspaceModel.create(req.body);
  return res.send(workspace);
};

exports.updateWorkspace = function (req, res, next) {
  workspaceModel.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    workspaceModel.findOne({_id: req.params.id}).populate('columns').populate('tasks').then(function(workspace){
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

exports.updateTask = async (req, res, next) => {
  await upload(req, res);
  if (req.file && req.file.id) {
    req.body.icon = req.file.id;
  }
  obj = {
    _id: req.body._id,
    name: req.body.name,
    description: req.body.description,
    startDate: new Date(req.body.startDate),
    dueDate: new Date(req.body.dueDate),
    icon: req.body.icon,
    label: null,
    column: req.body.column,
    columnIndex: parseInt(req.body.columnIndex),
    toDos: [],
    __v: 0
  }
  console.log(typeof obj)
  console.log(req.params.id)
  taskModel.findOne({_id: req.params.id}).then(function(task){
    console.log(task);
  });
  taskModel.findByIdAndUpdate({_id: req.params.id}, obj).then(function(){
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

// CRUD Files ##################################
exports.getFileById = function (req, res, next) {
  const { id } = req.params;

  fsChunks.findOne({files_id: id}).populate('files_id').then(function(fschunk){
    if (!fschunk) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).send({ error: 'Arquivo não encontrado.' })
    }
    res.set({'Content-Type': fschunk.files_id.contentType})
    return res.send(fschunk.data);
  }).catch(next);
};