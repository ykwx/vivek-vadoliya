import React from 'react';
import { NavLink } from 'react-router-dom';
import Emoji from './emoji'

const Navigation = (props) => {
    console.log(props)
    return (
        <nav className="navigation" role="navigation">
            <ul>
                <li>
                    <NavLink exact to="/" className="nav-link">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/projects" className="nav-link">Index</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className="nav-link">About</NavLink>
                </li>
                <li className="float-right">
                    <span className="emoji peace click" onClick={() => props.toggleModal(true)}>Open</span>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
