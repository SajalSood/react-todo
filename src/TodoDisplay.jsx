import React, { useState } from 'react';
import {fetchTask, fetchUpdateTask, fetchAllTodos, deleteTask} from './services';
import Filter from './Filter'

const TodoDisplay = ({todos,  userState , setTodos, setError, setUserState}) =>{
    const [newtodo, setTodo] = useState('');
    const [filterState, setFilterState] = useState('');
    const [sortState, setSortState] = useState('');

    const changeStatus = (e) => {
        const id = e.target.dataset.id;
        fetchTask(id, userState.username)
        .then( task  => {
            task.data.done = !task.data.done;
            const todo = {...task.data}
            fetchUpdateTask(userState.username, todo)
            .then( () =>{
                fetchAllTodos(userState.username)
                .then( tasks => {
                    setTodos(Object.values(tasks.data));
                })
            })
        })
        .catch( err => {
            setError(err.message);
            if(err.message =='no valid session' || err.message == 'action not permitted'){
                setUserState({
                    isLoggedIn: false
                });
                setError('Login to access');
            }
        })
    };

    const updateText = (e) => {
        const id = e.target.dataset.id;
        const text = newtodo;
        if(text) {
            fetchTask(id, userState.username)
            .then( task  => {
                const tasks = task.data
                const updated = {...tasks, task:text}
                fetchUpdateTask(userState.username, updated)
                .then( () => {
                    fetchAllTodos(userState.username)
                    .then( tasks => {
                        setTodos(Object.values(tasks.data));
                    })
                })
            })
            .catch( err => {
                setError(err.message);
                if(err.message =='no valid session' || err.message == 'action not permitted'){
                    setUserState({
                        isLoggedIn: false
                    });
                    setError('Login to continue...');
                }
            });
        }
        else {
            setError('Message cannot be empty');
        }
    };

    const deleteText =  (e) => {
        const id = e.target.dataset.id;
        deleteTask(userState.username, id)
        .then( () => {
            fetchAllTodos(userState.username)
            .then( tasks => {
                setTodos(Object.values(tasks.data));
            })
        })
        .catch( err => {
            setError(err.message);
            if(err.message =='no valid session' || err.message == 'action not permitted'){
                setUserState({
                    isLoggedIn: false
                });
                setError('Login to continue...');
            }
        })
    };

    function isFiltered(task){
        switch(filterState) {
            case "1":
                return true;
            case "2":
                return task.done === true;
            case "3":
                return task.done === false;
            default:
                return true;
        }
    }

    function isSorted(task1, task2){
        switch(sortState) {
            case "1":
                return task1.task.localeCompare(task2.task);
            case "2":
                return task2.task.localeCompare(task1.task);
            case "3":
                return task2.done - task1.done;    
            case "4":
                return task1.done - task2.done;
            default:
                return task1.task.localeCompare(task2.task);
        }
    }

    const todosList = [...todos]
    .sort(isSorted)
    .filter(isFiltered).map( (todo) =>
        <li className="item-group-child" key={todo.taskId}>
            <div className="item-grid">
                <div className="done">
                    <button className={todo.done ? 'btn btn-done' : 'btn btn-not-done'} data-id={todo.taskId} onClick={changeStatus}>{todo.done ? 'Done' : 'Not Done'}</button>
                </div>
                <div className="message">
                    <input className="form-control" onChange={ (e) => { setError(''); setTodo(e.target.value) } } defaultValue={todo.task} placeholder="Update Task Here"/>
                    <button className="btn btn-update" data-id={todo.taskId} onClick={updateText}>Update</button>
                </div>
                <button className="btn btn-delete" data-id={todo.taskId} onClick={deleteText}>Delete</button>
            </div>
        </li>
    );

    return (
        <div className="todo-area">
            <Filter filterState={ filterState } onFilter={(e) => setFilterState(e) }
             sortState= { sortState } onSort={(e) => setSortState(e)}></Filter>
            <div>
                <ul className="item-group todo-group">{ todosList }</ul>
            </div>
        </div>
    )

}

export default TodoDisplay;
