import React from 'react';
import './SignIn.css';

const SignIn = ({ signIn, register }) => {
    return (
        <div className="signIn">
            <h1>Sign in</h1>
            <div className="userName">
                <label htmlFor="uname">Username<br /></label>
                <input type="text" placeholder="Enter Username" name="uname" required />
            </div>
            <div className="password">
                <label htmlFor="psw">Password<br /></label>
                <input type="password" placeholder="Enter Password" name="psw" required />
            </div>
            <div>
                <button className="registerBtn" onClick={register.bind(this, 'Register')}>Register</button>
            </div>
            <button className="signInBtn" onClick={signIn.bind(this, 'Home')}>Login</button>
        </div>
    );
}

export default SignIn;