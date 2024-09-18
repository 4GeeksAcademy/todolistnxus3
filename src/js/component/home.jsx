import React, { useState, useEffect } from "react";

const Home = () => {
    const [nuevoTodo, setNuevoTodo] = useState("");
    const [todos, setTodos] = useState([]);

    const handleClick = async () => {
        if (nuevoTodo.trim() === "") return;

        console.log("Nueva tarea", nuevoTodo);

        const responseUser = await fetch("https://playground.4geeks.com/todo/todos/juancarlosdiaz", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                label: nuevoTodo,
                is_done: false,
                id: todos.length

            })

        });

        if (responseUser.ok) {
            setTodos([...todos, { label: nuevoTodo, is_done: false, id: todos.length }]);
            setNuevoTodo("");
        } else {
            console.error("Failed to add new todo");
        }
    };
    const deleteTodo = async (id) => {
        try {
            const responseUser = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE",
                headers: {
               //     'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
               // body: JSON.stringify()

            })
            console.log(responseUser);
            loadTodos();
        }
        catch (error) {
            console.error("Hubo un problema con la solicitud:", error);
        }
    }

        const loadTodos = async () => {
            try {
                const response = await fetch("https://playground.4geeks.com/todo/users/juancarlosdiaz");
                if (!response.ok) {
                    // Handle network error or retry logic here if necessary
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
                        todos.map((todo) => (
                            <li key={todo.id}>
                                {todo.label} <button onClick={() => deleteTodo(todo.id)}>Borrar</button>
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
