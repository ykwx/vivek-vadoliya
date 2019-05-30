import React from 'react'
import { Link } from 'react-router-dom';

// Stateless function
const ProjectItem = ( props ) => {

    return (
        <h3>
            <Link to={`/projects/${props.slug}`} article={props}>{props.title}</Link>
        </h3>
    )
};

export default ProjectItem;
