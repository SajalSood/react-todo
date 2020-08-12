export const fetchLoginStatus = () =>{
    return fetch('/session',{
        method:'GET',
      })
      .catch( (error) => error.json().then(err => Promise.reject(err.message)))
      .then( (response) =>{
        if(!response.ok){
          return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    });
}

export const fetchLogin = (username) => {
    return fetch('/session',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username }),
    })
    .catch( (error) => error.json().then(err => Promise.reject(err.message)))
    .then( (response) => {
        if(!response.ok){
            return response.json().then( err => Promise.reject(err));
        }
        return response.json();
    });
}

export const fetchLogout = () => {
    return fetch('/session', {
        method: 'DELETE',
    })
    .catch( (error) => error.json().then(err => Promise.reject(err.message)))
    .then( (response) => {
        if(!response.ok){
            return Promise.reject({ error: 'Error logging out'})
        }
        return;
    });
}

export const fetchTodo = (task, username) => {
    return fetch(`/tasks/${username}`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({task: task})
    })
    .catch( (error) => error.json().then(err => Promise.reject(err.message)))
    .then( (response) => {
        if(!response.ok){
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    });
}

export const fetchAllTodos = (username) => {
    return fetch(`/tasks/${username}`, {
        method: 'GET'
    })
    .catch( (error) => error.json().then(err => Promise.reject(err.message)))
    .then( (response) => {
        if(!response.ok){
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    });
}

export const fetchTask = (taskId, username) => {
    return fetch(`/tasks/${username}/${taskId}`,{
        method: 'GET'
    })
    .catch( (error) => error.json().then(err => Promise.reject(err.message)))
    .then( (response) =>{
        if(!response.ok){
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    })
}

export const fetchUpdateTask = (username, task) => {
    return fetch(`/tasks/${username}/${task.taskId}`, {
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({task: task})
    })
    .catch( (error) => error.json().then(err => Promise.reject(err.message)))
    .then( (response) =>{
        if(!response.ok){
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    })
}

export const deleteTask = (username, taskId) => {
    return fetch(`/tasks/${username}/${taskId}`, {
        method: 'DELETE'
    })
    .catch( (error) => error.json().then(err => Promise.reject(err.message)))
    .then( (response) =>{
        if(!response.ok){
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    })
}

export const fetchTheme = (username) => {
    return fetch(`/theme/${username}`,{
        method:'GET'
    })
    .catch( (error) => error.json().then(err => Promise.reject(err.message)))
    .then( (response) =>{
        if(!response.ok){
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    })
}

export const updateTheme = (username, theme) => {
    return fetch(`/theme/${username}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({theme: theme})
    })
    .catch( (error) => error.json().then(err => Promise.reject(err.message)))
    .then( (response) =>{
        if(!response.ok){
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    })
}