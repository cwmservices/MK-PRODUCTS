import React from 'react';
import {NavLink} from 'react-router-dom';

const ErrorPage = () =>{
    return(<><br/><br/><br/>
        <div className="error" style={{textAlign:'center'}}>
            <h1>404</h1>
            <NavLink className="err" to="/">Click Here To Go Back To Home Page</NavLink>    
        </div>
    </>)
}

export default ErrorPage;