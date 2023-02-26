import React, { useState } from "react";
import './style.css'
import trash from './img/trash.png';
import moveBack from './img/moveback.png';

function TodoList() {

    const [addModalOpen, setModalOpen] = useState(false);

    const [toDoModalOpen, setToDoModalOpen] = useState(false);

    const [selectedButtonCoordinates, setSelectedButtonCoordinates] = useState({ x: 0, y: 0 });

    const [selectedTodoIndex, setSelectedTodoIndex] = useState(null);

    const [filter, setFilter] = useState("todo");

    const [todos, setTodos] = useState([
        { task: "Write Essay", completed: false, deleted: false },
        { task: "One Hour CSS Course Online", completed: false, deleted: false },
        { task: "Buy One Way Tickets to San Fransico", completed: false, deleted: false },
        { task: "Go to Gym", completed: false, deleted: false },
        { task: "Buy Groceries", completed: true, deleted: false },
    ]);

    const addTodo = task => {
        setTodos([...todos, { task, completed: false, deleted: false }]);
    };

    const completeTodo = index => {
        const newTodos = [...todos];
        newTodos[index].completed = true;
        setTodos(newTodos);
    };

    const uncompleteTodo = index => {
        const newTodos = [...todos];
        newTodos[index].completed = false;
        setTodos(newTodos);
      };

    const deleteTodo = index => {
        const newTodos = [...todos];
        newTodos[index].deleted = true;
        setTodos(newTodos);
    };

    const restoreTodo = index => {
        const newTodos = [...todos];
        newTodos[index].deleted = false;
        setTodos(newTodos);
    };

    const permanentlyDeleteTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === "todo") return !todo.deleted
        if (filter === "done") return todo.completed && !todo.deleted;
        if (filter === "trash") return todo.deleted;
        return true;
    });

    const handleFilter = filter => {
        setFilter(filter);
    };
    
    const toggleModal = () => {
        setModalOpen(!addModalOpen)
    }

    const toggleToDoModal = (event, index) => {
        setSelectedButtonCoordinates({
            x: event.target.offsetLeft,
            y: event.target.offsetTop,
          });
        setSelectedTodoIndex(index);
        setToDoModalOpen(!toDoModalOpen);
    }

    return (
        <div className="mainWrapper">
            <div className="buttons">
                <div className="filterbuttons">
                    <button
                        className={filter === "todo" ? "active" : "notActive"}
                        onClick={() => handleFilter("todo")}>To Do
                    </button>

                    <button 
                        className={filter === "done" ? "active" : "notActive"}
                        onClick={() => handleFilter("done")}>Done
                    </button>

                    <button 
                        className={filter === "trash" ? "active" : "notActive"}
                        onClick={() => handleFilter("trash")}>Trash
                    </button>
                </div>
                <div className="addbutton">
                    <button className="plusButton" onClick={toggleModal}></button>
                        {addModalOpen && (
                            <div className="modal">
                                <p>Add New To Do</p>
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addTodo(e.target.todoInput.value);
                                    e.target.todoInput.value = "";
                                    toggleModal();
                                }}>
                                    <textarea className="addInput" placeholder="Your text" type="text" name="todoInput" />
                                    <button className="modalAddButton" type="submit">Add</button>
                                </form>
                            </div>
                        )}
                </div>
            </div>
            <h1 style={{fontSize: 24, marginTop: 64, marginBottom: 24}}>{(filter === "todo") ? "To Do" : (filter === "done") ? "Done" : (filter === "trash") ? "Trash" : "Я не знаю такой раздел!"}</h1>
            <hr style={{background: "#151517", opacity: 0.2, height: 2, marginBottom: 24}}></hr>
            <div>
                {filteredTodos.map((todo, index) => (
                    <div className="toDoList" key={index}>
                        <button className="toDoModalButton" onClick={(event) => toggleToDoModal(event, index)}></button>
                        {toDoModalOpen && selectedTodoIndex === index && (
                            <div className="toDoModal" style={{
                                position: 'absolute',
                                top: selectedButtonCoordinates.y,
                                left: selectedButtonCoordinates.x,
                              }}>
                                {!todo.deleted && (
                                    <button className="toDoBtn" onClick={() => deleteTodo(index)}><img src={trash} alt='img' />Move to Trash</button>
                                )}
                                {todo.deleted && (
                                    <>
                                        <button className="toDoBtn" onClick={() => permanentlyDeleteTodo(index)}><img src={trash} alt='img' />Delete Forever</button>
                                        <button className="toDoBtn" onClick={() => restoreTodo(index)}><img src={moveBack} alt='img' />Move Back To To Do</button>
                                    </>
                                )}
                            </div>
                        )}
                        <div className="checkBox">
                        <input
                            type="checkbox"
                            checked={todos[index].completed}
                            onChange={() => {
                                if (todos[index].completed) {
                                uncompleteTodo(index);
                                } else {
                                completeTodo(index);
                                }
                            }}
                            />
                            <label for="completeCheckbox"></label>
                        </div>
                        <p className="toDoTask" style={{textDecoration: todo.completed ? "line-through" : "none"}}>{todo.task}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
    
export default TodoList;