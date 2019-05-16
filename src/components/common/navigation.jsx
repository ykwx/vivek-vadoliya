import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Emoji from './emoji'

const Navigation = (props) => {
    return (
        <nav className="navigation" role="navigation">
            <ul>
                <li>
                    <NavLink to="/projects" className="nav-link">Index</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className="nav-link">About</NavLink>
                </li>
                <li className="float-right">
                    <Emoji
                        symbol="✌🏾"
                        label="Info"
                        toggleModal={props.toggleModal}
                    />

                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
