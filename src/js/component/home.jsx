import React, { useState, useEffect } from "react";

// Crea tu primer componente
const Home = () => {
    const [nuevoTodo, setNuevoTodo] = useState("");
    const [todos, setTodos] = useState([]);

    const handleClick = () => {
        if (nuevoTodo.trim() === "") return;

        console.log("Nueva tarea", nuevoTodo);
       
        setTodos([...todos, { label: nuevoTodo, is_done: false, id: todos.length }]);
        setNuevoTodo("");
    };

    const deleteTodo = (indice) => {
        const listaNueva = todos.filter((_, i) => i !== indice);
        setTodos(listaNueva);
    };

    const loadTodos = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/juancarlosdiaz");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Datos de la API:", data);
            setTodos(data.todos || []);
        } catch (error) {
            console.error("Hubo un problema con la solicitud:", error);
        }
    };

    useEffect(() => {
        loadTodos();
    }, []);

    const handleChange = (evento) => {
        setNuevoTodo(evento.target.value);
    };

    return (
        <div className="text-center">
            <h1 className="text-center mt-5">To do list Usando React + Fetch</h1>
            <div>
                <input 
                    type="text" 
                    value={nuevoTodo} 
                    onChange={handleChange} 
                    placeholder="Agregar nueva tarea"
                />
                <button onClick={handleClick}>
                    Agregar tarea
                </button>
            </div>
            <p>Nueva tarea: {nuevoTodo}</p>
            <ul>
                {todos.length > 0 ? (
                    todos.map((todo, indice) => (
                        <li key={todo.id}>
                            {todo.label} <button onClick={() => deleteTodo(indice)}>Borrar</button>
                        </li>
                    ))
                ) : (
                    <p>No hay tareas</p>
                )}
            </ul>
        </div>
    );
};

export default Home;
