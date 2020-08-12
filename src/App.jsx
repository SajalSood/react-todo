import React, {useState, useEffect } from 'react';
import './App.css';
import { fetchLoginStatus, fetchTheme, updateTheme } from './services';
import Login from './Login';
import Logout from './Logout';
import Todo from './Todo';
import ThemeContext from './ThemeContext';

const App = () => {
  const [userState, setUserState] = useState({ isLoggedIn: false});
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    fetchLoginStatus()
    .then((user) => {
      setUserState({ 
        isLoggedIn: true,
        username: user.data.username
      });
      getTheme(user.data.username);
    });
  }, []);

  const login = (username) => {
     setUserState({ 
       isLoggedIn: true,
       username
     });
     getTheme(username);
  };

  const getTheme = (username) => {
    fetchTheme(username)
    .then(user => {
        if(user.data === 'light' || user.data === 'dark'){
            setTheme(user.data);
        }else {
            setTheme('colorful');
        }
    })
    .catch(err =>{
      setError(err.message);
      if(err.message === 'no valid session' || err.message === 'action not permitted'){
          setUserState({
              isLoggedIn: false
          });
      }
    });
  };

  const changeTheme = (e) => {
    setTheme(e.target.value);
    updateTheme(userState.username, e.target.value)
    .catch(err =>{
        setError(err.message);
        if(err.message === 'no valid session' || err.message === 'action not permitted'){
            setUserState({
                isLoggedIn: false
            });
        }
    });
  };

  const logout = ()=>{
    setUserState({
        isLoggedIn: false
    });
    setTheme('light');
  };

  return (
    <ThemeContext.Provider value = { [theme, setTheme] }>
      <div className="App">
        <header className="App-header">
          <div className="theme">
            {
              userState.isLoggedIn &&
              <select value={theme} className="form-control form-select" onChange={changeTheme}>
                <option value="colorful">Colorful Theme</option>
                <option value="light">Light Theme</option>
                <option value="dark">Dark Theme</option>
              </select>
            }
          </div>
          <h2>Welcome To T0d0!</h2>
          <div>
            {
                userState.isLoggedIn &&
                <Logout onLogout={ logout } setError={ setError }/>
            }
          </div>
        </header>
        <section className={theme}>
          <p className ="info-danger">{ error }</p>
          {
            userState.isLoggedIn && <Todo userState={ userState } setUserState={ setUserState } setError={ setError }/> 
          }
          {
            !userState.isLoggedIn && <Login onLogin={ login } setError={ setError }/>  
          }
        </section>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;