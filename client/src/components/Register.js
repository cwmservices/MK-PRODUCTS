import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Register() {

    const history = useHistory();

    const [user, userData] = useState({
        name: '',
        email: '',
        phone: '',
        profession: '',
        password: '',
        cpassword: ''
    });

    let name, value;
    const takeInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        userData({ ...user, [name]: value });
    }

    const register = async (e) => {
        e.preventDefault();

        const { name, email, phone, profession, password, cpassword } = user;

        const res = await fetch('/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, profession, password, cpassword })
        })

        const data = await res.json();

        if (!data || data.status === 422) {
            alert('Invalid Registration');
            window.alert('Invalid Registration');
        }
        else {
            history.push('/login');

        }

    }

    return (
        <>
            <h1 style={{ "marginLeft": "12px" }}>SignUp Form</h1>
            <form class="row g-3 container" method="POST">
                <div class="col-md-12">
                    <label for="NameValidation" class="form-label">Name</label>
                    <input onChange={takeInputs} type="text" name="name" value={user.name} className="form-control" placeholder="Your Name"  id="NameValidation" />
                </div>
                <div class="col-md-12">
                    <label for="EmailValidation" class="form-label">Email</label>
                    <input onChange={takeInputs} type="email" id="email" name="email" value={user.email} className="form-control" placeholder="Your email" id="EmailValidation" />
                </div>
                <div class="col-md-12">
                    <label for="PhoneValidation" class="form-label">Phone</label>
                    <input onChange={takeInputs} type="Number" name="phone" value={user.phone} className="form-control" placeholder="Your phone" aria-label="Username"  id="PhoneValidation" />
                </div>
                <div class="col-md-12">
                    <label for="ProfessionValidation" class="form-label">Profession</label>
                    <input onChange={takeInputs} type="text" name="profession" value={user.profession} className="form-control" placeholder="Your profession" aria-label="Username"   id="ProfessionValidation" />
                </div>
                <div class="col-md-12">
                    <label for="PasswordValidation" class="form-label">Password</label>
                    <input onChange={takeInputs} type="text" name="password" value={user.password} className="form-control" placeholder="Your password" aria-label="Username"   id="PasswordValidation" />
                </div>
                <div class="col-md-12">
                    <label for="ConfirmPasswordValidation" class="form-label">Confirm Password</label>
                    <input onChange={takeInputs} type="text" name="cpassword" value={user.cpassword} className="form-control" placeholder="Your cpassword" aria-label="Username"   id="ConfirmPasswordValidation" />
                </div>
                <div class="col-md-12">
                    <button style={{ "marginBottom": "10px" }} type="submit" onClick={register} style={{ "background": "orange", "color": "black" }} id="submit" name="submit" className="form-control">Submit</button>
                </div> 
            </form>
        </>)
}

export default Register
