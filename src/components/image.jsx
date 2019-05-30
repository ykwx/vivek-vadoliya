import React from 'react';

const Image = ({imgAlt, imgSrc, handleClick, width}) => {

    const imageSize = "?fm=jpg&fl=progressive&w=" + width;
    const imgPath = imgSrc + imageSize;

    return (
        <span className="image-wrap"><img alt={imgAlt} src={imgPath} loading="lazy" /></span>
    );

};

export default Image;
