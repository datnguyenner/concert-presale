import React, { Component } from 'react';
import './Register.css';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onchangeEmail= (e) => {
        this.setState({ email: e.target.value });
    }

    onchangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    onchangeName = (e) => {
        this.setState({ name: e.target.value });
    }

    onSubmit = async () => {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(this.state)
        });

        console.log(JSON.stringify(this.state));
        if(response.status === 201){
            const data = await response.json();
            this.props.register('Home');
        }
    }

    render() {
        return (
            <div className="register">
                <h1>Register</h1>
                <div>
                    <label htmlFor="email">Email<br /></label>
                    <input type="text" placeholder="Enter Email" onChange={this.onchangeEmail} name="email" required />
                </div>
                <div className="userName">
                    <label htmlFor="uname">Username<br /></label>
                    <input type="text" placeholder="Enter Username" onChange={this.onchangeName} name="uname" required />
                </div>
                <div className="password">
                    <label htmlFor="psw">Password<br /></label>
                    <input type="password" placeholder="Enter Password" onChange={this.onchangePassword} name="psw" required />
                </div>
                <button onClick={this.props.register.bind(this, 'SignIn')}>Cancel</button>
                <button onClick={this.onSubmit}>Register</button>
            </div>
        );
    }
}

export default Register;