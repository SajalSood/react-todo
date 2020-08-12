import React, { useState} from 'react';
import {fetchTodo, fetchAllTodos} from './services';

const AddTodo = ({onSend, userState, setUserState, setError}) => {
    const [todo, setTodo] = useState('');

    const addTodo = (e) =>{
        if(todo){
            const task = {task: todo, done: false};
            fetchTodo(task , userState.username)
            .then(() =>{
                setTodo('');
                fetchAllTodos(userState.username)
                .then((todos) => {
                    onSend(todos.data);
                    setError('');
                }) 
            })
            .catch((err) => {
                setError(err.message);
                if(err.message === 'no valid session' || err.message === 'action not permitted'){
                    setUserState({
                        isLoggedIn: false
                    });
                    setError('Login to continue');
                }
            })
        }
        if(!todo){
            setError('Message cannot be Empty');
        }
    };

    const onInput = (e) => {
        setError('');
        setTodo(e.target.value);
    };

    return (
        <div className="message">
            <input className="form-control" value={ todo } onChange={ onInput } placeholder="Enter Task Here" />         
            <button className="btn btn-send" onClick={ addTodo }>Add Todo</button>
        </div>
    );
};

export default AddTodo;