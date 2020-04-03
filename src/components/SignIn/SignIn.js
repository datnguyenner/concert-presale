import React, { Component } from 'react';
import './SignIn.css';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onchangeUserName = (e) => {
        this.setState({ email: e.target.value });
    }

    onchangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    onSubmit = async () => {
        const response = await fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(this.state)
        });

        console.log(JSON.stringify(this.state));
        if(response.status === 200){
            const data = await response.json();
            this.props.signIn('Home');
        }
    }

    render() {
        const { register } = this.props;
        return (
            <div className="signIn">
                <h1>Sign in</h1>
                <div className="userName">
                    <label htmlFor="uname">Username<br /></label>
                    <input type="text" placeholder="Enter Username" onChange={this.onchangeUserName} name="uname" required />
                </div>
                <div className="password">
                    <label htmlFor="psw">Password<br /></label>
                    <input type="password" placeholder="Enter Password" onChange={this.onchangePassword} name="psw" required />
                </div>
                <div>
                    <button className="registerBtn" onClick={register.bind(this, 'Register')}>Register</button>
                </div>
                <button className="signInBtn" onClick={this.onSubmit}>Login</button>
            </div>
        );
    }
}

export default SignIn;