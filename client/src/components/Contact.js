import React, {useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom';

function Contact() {

    const history = useHistory();

    const [userInfo,setuserInfo] = useState({name:"",email:""});

    const contactPageLoaded = async () => {
        try {
            const res = await fetch('/contact', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
        const data = await res.json(); 
        console.log(data);

        if (!res.status===200) {
            console.log('error');
        }
    }
    catch (error) {
        history.push('/login');
        console.log(error);
    }

    }
    useEffect(() => {
        contactPageLoaded();
    }, []);

    const contactMessages = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
 
        setuserInfo({...userInfo,[name]:value});
     }

    const sendingContactDataToServer = async(e) =>{
        e.preventDefault();
        const {name,email,message} =userInfo;

        try{
            const res = await fetch('/contact',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({name,email,message})
            })

            const data = await res.json();
            if(!data){
                alert('data not send');
            }
            else{
                alert('message send')
            }

        }catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <h1 style={{ "marginLeft": "12px" }}>Contact Form</h1>
            <form class="row g-3 container" method="POST">
                <div class="col-md-12">
                    <label for="nameValidation" class="form-label">Name</label>
                    <input onChange={contactMessages} type="text" name="name" className="form-control" placeholder="Your Name" id="nameValidation" />
                </div>
                <div class="col-md-12">
                    <label for="emailValidation" class="form-label">Email</label>
                    <input onChange={contactMessages} type="email" name="email" className="form-control" placeholder="Your email" id="emailValidation" />
                </div>
                <div class="col-md-12">
                    <label for="messageValidation" class="form-label">Message</label>
                    <textarea onChange={contactMessages} rows="" cols="" type="text" name="message" className="form-control" placeholder="Your Message..." id="messageValidation" />
                </div>
                <div class="col-md-12">
                    <button onClick={sendingContactDataToServer} style={{ "marginBottom": "10px" }} type="submit" className="btn btn-primary" id="submit" name="submit">Submit</button>
                </div>
            </form>
        </>
    )
}

export default Contact
