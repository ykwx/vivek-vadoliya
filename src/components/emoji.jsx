import React from 'react';
import { Link } from 'react-router-dom';

const Emoji = props => (
    <Link
        className="emoji click"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
        to="/"
    >
        {props.symbol}
    </Link>
);
export default Emoji;
