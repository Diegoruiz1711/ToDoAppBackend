const express = require('express');
const todoRouter = express.Router();
const taskController = require('../controllers/controllers')

/* Un Router de express es como un switch case de Javascript. Simplemente redirige las peticiones hacia la ruta correcta, si esta existe.

En una aplicacion de express podemos tener tantos Routers como queramos/sean necesarios. Lo habitual cuando se implementa una API REST
es tener un Router por cada "recurso" de la api. Si imaginamos una aplicacion que tiene 3 recursos (User, Todo, Category), deberiamos
tener 3 routers diferentes: userRouter, todoRouter y categoryRouter.
*/

todoRouter.get('/', taskController.getAllTasks);
todoRouter.post('/', taskController.createTask);
todoRouter.put('/:id', taskController.editTask);
todoRouter.get('/:id', taskController.getTaskById);
todoRouter.delete('/:id', taskController.deleteTask);

module.exports = todoRouter;
