import React from 'react';

// Stateless function
const ProjectToggle = ({displayStyle, onSwitch}) => {

    return (
        <nav role="navigation">
            <ul className="project-toggle">
                <li><i className={"material-icons click " + (displayStyle == 'slide' ? 'active' : 'not-active')} onClick={() => onSwitch('slide')}>view_column</i></li>
                <li>
                    <i className={"material-icons click " + (displayStyle == 'grid' ? 'active' : 'not-active')} onClick={() => onSwitch('grid')}>apps</i></li>
            </ul>
        </nav>
    );
};

export default ProjectToggle;
