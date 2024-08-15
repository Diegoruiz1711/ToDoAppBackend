//importamos el fichero con los datos que necesita nuestro Router
const todos = [{
  id: 0,
  text: "Hacer la cama",
  fecha: new Date("2022-05-21"),
  done: false
},
{
  id: 1,
  text: "Ir al super",
  fecha: new Date("2022-05-14"),
  done: true
}];

module.exports = {
  todos
};
