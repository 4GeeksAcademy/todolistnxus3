import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";



//create your first component
const Home = () => {

	//let nuevoTodo = "Tarea de ejemplo";
	 const [nuevoTodo, setNuevoTodo] = useState("Tarea de ejemplo");
	 const [todos, setTodos] = useState (["Una tarea de prueba", "Dos tareas de prueba"]);

const handleClick = () => {
	console.log("Nueva tarea", nuevoTodo);

	setTodos([...todos, nuevoTodo])
}

const deleteTodo = (indice) => {

	const listaNueva = todos.filter((todo, i) => i !== indice)
	setTodos(listaNueva);

}

const handleChange = (evento) => {
	
	setNuevoTodo(event.target.value);

}

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">To do list Usando React + Fetch</h1>
				<div>
					<input type = "text" onChange={handleChange}/>
					<button onClick={handleClick}>
						Agregar tarea
					</button>
				</div>
				<p>Nueva tarea: {nuevoTodo}</p>
				<ul>
					{todos.map((todo, indice) => {
						return (
							<li>
								{todo} <button onClick={() => deleteTodo(indice) } >Borrar</button>
							</li>
						)
					})}
				</ul>
		</div>
	);
};

export default Home;
