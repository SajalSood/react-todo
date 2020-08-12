import React from 'react';
import { fetchLogout } from './services';

const Logout = ({ onLogout, setError }) =>{

    const doLogout = () =>{
        fetchLogout()
        .then(() => onLogout() )
        .catch((err) =>{  
            setError(err.error);
        });
    };

    return (
        <div className="logout">
            <button className="btn btn-logout" onClick={ doLogout }>Logout</button>
        </div>
    );
};

export default Logout;