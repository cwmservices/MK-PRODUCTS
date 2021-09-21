import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
    const history = useHistory();

    let [useremailattrib, useremail] = useState('');
    let [userpasswordattrib, userpassword] = useState('');

    const login = async (e) => {
        e.preventDefault();

        const email = useremailattrib;
        const password = userpasswordattrib;

        const res = await fetch('/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        const data = res.json();

        if (res.status === 400 || !data) {
            history.push('/register');
        }
        else {
            history.push('/');
        }
    }
    return (
        <>

            <h1 style={{ "marginLeft": "12px" }}>Login Form</h1>
            <form class="row g-3 container" method="POST">
                <div class="col-md-12">
                    <label for="formValidation" class="form-label">Email</label>
                    <input value={useremailattrib} onChange={(e) => {
                        useremail(e.target.value)
                    }
                    } type="email" name="email" className="form-control" placeholder="Your email" id="formValidation" />
                </div>
                <div class="col-md-12">
                    <label for="passwordValidation" class="form-label">Password</label>
                    <input value={userpasswordattrib} onChange={(e) => {
                        userpassword(e.target.value)
                    }
                    } type="text" name="password" className="form-control" placeholder="Your password" id="passwordValidation" />
                </div>
                <div class="col-md-12">
                    <button style={{"marginBottom":"10px"}} onClick={login} type="submit" className="btn btn-primary" id="submit" name="submit">Submit</button>
                </div>
            </form>
        </>
    )
}
export default Login;
