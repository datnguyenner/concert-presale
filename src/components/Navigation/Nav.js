import React from 'react';
import './Nav.css';

const Nav = ({ signOut }) => {
    return (
        <div className="nav">
            <button className="signOut" onClick={signOut.bind(this, 'SignIn')}>Sign out</button>
        </div>
    );
}

export default Nav;