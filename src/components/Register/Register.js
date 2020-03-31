import React from 'react';
import './Register.css';

const Register = ({ register }) => {
    return (
        <div className="register">
            <h1>Register</h1>
            <div>
                <label htmlFor="email">Email<br/></label>
                <input type="text" placeholder="Enter Email" name="email" required />
            </div>
            <div className="userName">
                <label htmlFor="uname">Username<br/></label>
                <input type="text" placeholder="Enter Username" name="uname" required />
            </div>
            <div className="password">
                <label htmlFor="psw">Password<br/></label>
                <input type="password" placeholder="Enter Password" name="psw" required />
            </div>
            <button onClick={register.bind(this, 'SignIn')}>Cancel</button>
            <button onClick={register.bind(this, 'Home')}>Register</button>
        </div>
    );
}

export default Register;