const express = require ('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

// Rotas User ############################################
router.get('/user/:email', apiController.getUser);
router.post('/user', apiController.createUser);
router.put('/user/:id', apiController.updateUser);

// Rotas Workspace ############################################
router.get('/workspace/Id/:id', apiController.getWorkspaceById);
router.get('/workspace/OwnerId/:ownerId', apiController.getWorkspaceByOwnerId);
router.post('/workspace', apiController.createWorkspace);
router.put('/workspace/:id', apiController.updateWorkspace);
router.delete('/workspace/:id', apiController.deleteWorkspace);

// Rotas Task ############################################
router.get('/task/:id', apiController.getTask);
router.post('/task', apiController.createTask);
router.put('/task/:id', apiController.updateTask);
router.delete('/task/:id', apiController.deleteTask);

// Rotas Column ############################################
router.get('/column/:id', apiController.getColumn);
router.post('/column', apiController.createColumn);
router.put('/column/:id', apiController.updateColumn);
router.delete('/column/:id', apiController.deleteColumn);

// Rotas Label ############################################
router.get('/label/:id', apiController.getLabel);
router.post('/label', apiController.createLabel);
router.put('/label/:id', apiController.updateLabel);
router.delete('/label/:id', apiController.deleteLabel);

// Rotas ToDoItem ############################################
router.get('/toDoItem/:id', apiController.getTodoItem);
router.post('/toDoItem', apiController.createTodoItem);
router.put('/toDoItem/:id', apiController.updateTodoItem);
router.delete('/toDoItem/:id', apiController.deleteTodoItem);

// Rotas Pomodoro ############################################
router.get('/pomodoro/:id', apiController.getPomodoro);
router.post('/pomodoro', apiController.createPomodoro);
router.put('/pomodoro/:id', apiController.updatePomodoro);
router.delete('/pomodoro/:id', apiController.deletePomodoro);

// Rotas Files ############################################
router.get('/file/:id', apiController.getFileById);

module.exports = router;  