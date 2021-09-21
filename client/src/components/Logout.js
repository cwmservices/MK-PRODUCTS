import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';

function Logout() {

    const history = useHistory();
    
    const checkUserLoginandLogout = async () => {
        try {
            const res = await fetch('/logout', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            if (res) {
                history.push('/login');
            }
            else {
                console.log('user is not login')
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        checkUserLoginandLogout();
    },[])

    return (
       <h1>Logout Page</h1>
    )
}

export default Logout
