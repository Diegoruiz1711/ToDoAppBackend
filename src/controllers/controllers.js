const { todos } = require('../data/data');

const getAllTasks = (req, res) => {
    //devolver todos los "todos" que hay en el array con formato JSON.
    res.json(todos);
};


const createTask = (req, res) => {
    //crear un nuevo objeto con estructura {id, text, fecha, done} con los datos que vienen en el BODY de la Request y meterlos dentro de el array.
    //el nuevo objeto debe tener como id un numero mas que el numero actual de elementos guardados en el array.
    const datos = req.body;
    const newTask = {
        id: todos.length,
        text: datos.text,
        fecha: new Date(datos.fecha),
        done: datos.done
    };
    todos.push(newTask);
    res.json(newTask)
    /*
    En este endpoint, el path contiene una variable llamada id. La sintaxis que utiliza express para estos casos es el simbolo :
    Una variable en un path, significa que express recoge el valor que va justo después de /todo/ y lo guarda en una variable dentro del objeto "req"
    con el mismo nombre que hemos utilizado en el path.
    Ejemplo:
    
    Si con Insomnia o Postman hicisemos una peticion GET a la ruta /12, está será dirigida directamente hasta este endpoint.*/
};


const getTaskById = (req, res) => {
    //recogemos el valor de la variable del path llamada "id" y lo transformarlo a un numero (todos nuestros ids son numericos).
    const taskId = parseInt(req.params.id);
    //cualquier valor que recogemos de req.params será siempre un String. Por eso lo debemos convertir a numero.
    // verificar que el id sea numero, ya que hay que parsearlo a number por ser string
    if (isNaN(taskId)) {
        return res.status(400).json({ error: " Id must be a number" })
    }
    //buscar dentro del array "todos" aquel elemento que coincide con el id recibido por parametro de la ruta en la request.
    //si existe, devolverlo como formato JSON y codigo de status 200.
    const taskToEdit = todos.find(item => item.id === taskId)
    //Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.
    if (!taskToEdit) {
        return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(taskToEdit);
};

const editTask = (req, res) => {
    //recogemos el valor de la variable del path llamada "id" y lo transformamos a un numero (todos nuestros ids son numericos).
    //cualquier valor que recogemos de req.params será siempre un String. Por eso lo debemos convertir a numero. 
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
        return res.status(400).json({ error: " ID must be a number" })
    }
    const body = req.body;

    //buscar dentro del array "todos" aquel elemento que coincide con el id recibido por parametro de la ruta en la request.
    //si existe, lo ACTUALIZAMOS con los datos del BODY de la Request y lo devolvemos como formato JSON y codigo de status 200.
    const taskToEdit = todos.findIndex(item => item.id === taskId);

    //Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.
    if (taskToEdit === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    todos[taskToEdit] = {
        ...todos[taskToEdit],
        ...body
    };

    res.status(200).json(todos[taskToEdit]);
};


// MISSING '/todo/:id' DELETE

const deleteTask = (req, res) => {
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
        return res.status(400).json({ error: "ID must be a number" });
    }

    const taskToDelete = todos.findIndex(task => task.id === taskId);

    if (taskToDelete === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    todos.splice(taskToDelete, 1);

    res.status(204).send();
}

// todoRouter.delete('/todo/:id', (req, res) => {
//recogemos el valor de la variable del path llamada "id" y lo transformarlo a un numero (todos nuestros ids son numericos).
//cualquier valor que recogemos de req.params será siempre un String. Por eso lo debemos convertir a numero.

//buscar dentro del array "todos" aquel elemento que coincide con el id recibido por parametro de la ruta en la request.
//si existe, lo BORRAMOS y devolvemos un codigo de status 204.

//Si no hemos econtrado un TODO o no nos han pasado un id en la ruta, devolvemos un 404.

// });

//exportamos el router para poder 'usarlo' en nuestra app.
module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    editTask,
    deleteTask
}