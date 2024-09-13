import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";



//create your first component
const Home = () => {

	//let nuevoTodo = "Tarea de ejemplo";
	 const [nuevoTodo, setNuevoTodo] = useState("Tarea de ejemplo");

const handleClick = () => {
	console.log("Nueva tarea", nuevoTodo);
}

const handleChange = (evento) => {
	console.log(event.target.value)
	setNuevoTodo(event.target.value);

}

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Hello Rigo!</h1>
				<div>
					<input type = "text" onChange={handleChange}/>
					<button onClick={handleClick}>
						Agregar tarea
					</button>
				</div>
				<p>Nueva tarea: {nuevoTodo}</p>
		</div>
	);
};

export default Home;
