import React, { Component } from 'react';

const emailregx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: { value: '', validate: '', errorMsg: 'Email is required' },
            password: { value: '', validate: '', errorMsg: 'Password is required' }
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

    validateEmail = (email) => {
        if (!emailregx.test(String(email.value).toLowerCase())) {
            email.errorMsg = 'Invalid email address';
            email.validate = 'error';
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const inputs = this.checkRequired();
        const { email, password } = inputs;
        this.validateEmail(email);
        this.setState({ email, password });

        if (email.validate === 'success' && password.validate === 'success') {
            this.submitForm();
        }
    }

    submitForm = async () => {
        const { email, password } = this.state;
        const response = await fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email.value, password: password.value })
        });

        if (response.status === 200) {
            this.props.signIn('Home');
        }
    }

    render() {
        const { register } = this.props;
        const { email, password } = this.state;

        return (
            <div className="register">
                <form className="form" onSubmit={this.handleSubmit}>
                    <h2>Register</h2>
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
                    <button type="submit">Login</button>
                    <div className="register-user" onClick={register.bind(this, 'Register')}>Register</div>
                </form>
            </div>
        );
    }
}

export default SignIn;