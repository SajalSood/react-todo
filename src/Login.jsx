import React, {useEffect, useState } from 'react';
import { fetchLogin } from './services';

const Login = ({ onLogin, setError }) => {
    const [username, setUsername] = useState('');

    const doLogin = () =>{
        const name = username;
        fetchLogin(name)
        .then(user => {
            onLogin(user.data.username);
        })
        .catch((err) =>{
            setError(err.message);
        });
    };

    useEffect( () => {
        setError('');
    }, []);

    return (
        <div className="login">
            <div className="auth">
                <input className="form-control" onChange={ (e) => setUsername(e.target.value)} placeholder="Enter Username Here"/>
                <button className="btn btn-login" onClick={ doLogin }>Login</button>
            </div>
        </div> 
    );
};

export default Login;