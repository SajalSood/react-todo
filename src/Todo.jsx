import React, {useState, useEffect, useContext} from 'react';
import AddTodo from './AddTodo';
import TodoDisplay from './TodoDisplay'
import {fetchAllTodos } from './services';

const Todo = ({ userState, setUserState, setError }) => {
    const [todos, setTodos] = useState([]);

    const getTodos = () =>{
        fetchAllTodos(userState.username)
        .then( TodoList =>{
            setTodos(Object.values(TodoList.data));
        })
        .catch( err =>{
            setError(err.message);
        });
    };

    useEffect( () => {
        getTodos();
        setError('');
    }, []);

    const send = ( todosList) =>{
        setTodos(Object.values(todosList));
    };

    return (
        <div className="todo">
            <div className="message-area">
                <AddTodo onSend={ send } userState={userState} setUserState= {setUserState} setError= {setError}/>
            </div> 
            {
                todos.length > 0 && <TodoDisplay todos={ todos } userState={userState} setTodos={setTodos} setError= {setError} setUserState={setUserState}/> 
            }
        </div>
    );
};

export default Todo;