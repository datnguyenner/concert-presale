import React, { Component } from 'react';

const emailregx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: { value: '', validate: '', errorMsg: 'Username is required' },
            email: { value: '', validate: '', errorMsg: 'Email is required' },
            password: { value: '', validate: '', errorMsg: 'Password is required' },
            password2: { value: '', validate: '', errorMsg: 'Please confirm password' },
        }
    }

    onchangeEmail = (e) => {
        const email = { ...this.state.email };
        email.value = e.target.value;
        this.setState({ email });
    }

    onchangePassword = (e) => {
        const password = { ...this.state.password };
        password.value = e.target.value;
        this.setState({ password });
    }

    onchangePassword2 = (e) => {
        const password2 = { ...this.state.password2 };
        password2.value = e.target.value;
        this.setState({ password2 });
    }

    onchangeName = (e) => {
        const username = { ...this.state.username };
        username.value = e.target.value;
        this.setState({ username });
    }

    checkRequired = () => {
        const inputs = this.state;
        for (let prop in inputs) {
            if (inputs[prop].value) {
                inputs[prop].validate = 'success';
            } else {
                inputs[prop].validate = 'error';
            }
        }
        return inputs;
    }

    confirmPassword = (password, password2) => {
        if (password.value && password2.value) {
            if (password.value !== password2.value) {
                password2.errorMsg = 'Password do not match';
                password2.validate = 'error';
            }
        }
    }

    validateEmail = (email) => {
        if (!emailregx.test(String(email.value).toLowerCase())) {
            email.errorMsg = 'Invalid email address';
            email.validate = 'error';
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const inputs = this.checkRequired();
        const { username, email, password, password2 } = inputs;
        this.validateEmail(email);
        this.confirmPassword(password, password2);
        this.setState({ username, email, password, password2 });

        if (username.validate === 'success' && email.validate === 'success' && password.validate === 'success' && password2.validate === 'success') {
            this.submitForm();
        }

    }

    submitForm = async () => {
        const { username, email, password } = this.state;
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username.value, email: email.value, password: password.value })
        });

        if (response.status === 201) {
            this.props.register('Home');
        }

    }

    render() {
        const { username, email, password, password2 } = this.state;
        return (
            <div className="register">
                <form className="form" onSubmit={this.handleSubmit}>
                    <h2>Register</h2>
                    <div className="form-control">
                        <label htmlFor="uname">username</label>
                        <input className={username.validate} type="text" placeholder="Enter username" onChange={this.onchangeName} name="uname" />
                        <small>{username.validate === 'error' ? username.errorMsg : ''}</small>
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input className={email.validate} type="text" placeholder="Enter Email" onChange={this.onchangeEmail} name="email" />
                        <small>{email.validate === 'error' ? email.errorMsg : ''}</small>
                    </div>
                    <div className="form-control">
                        <label htmlFor="psw">Password</label>
                        <input className={password.validate} type="password" placeholder="Enter Password" onChange={this.onchangePassword} name="psw" />
                        <small>{password.validate === 'error' ? password.errorMsg : ''}</small>
                    </div>
                    <div className="form-control">
                        <label htmlFor="psw2">Confirm Password</label>
                        <input className={password2.validate} type="password" placeholder="Confirm Password" onChange={this.onchangePassword2} name="psw2" />
                        <small>{password2.validate === 'error' ? password2.errorMsg : ''}</small>
                    </div>
                    <button type="submit">Submit</button>
                    <button onClick={this.props.register.bind(this, 'SignIn')}>Cancel</button>
                </form>
            </div>
        );
    }
}

export default Register;