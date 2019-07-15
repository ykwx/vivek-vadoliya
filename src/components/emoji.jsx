import React from 'react';

const Emoji = props => (
    <span
        className="emoji click"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
        onClick={() => props.toggleModal(true)}
    >
        {props.symbol}
    </span>
);
export default Emoji;
