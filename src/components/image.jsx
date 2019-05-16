import React from 'react';

const Image = ({imgAlt, imgSrc, handleClick}) => {

    const imageSize = "?fm=jpg&fl=progressive&w=720";
    const imgPath = imgSrc + imageSize;

    return (
        <img alt={imgAlt} src={imgPath} loading="lazy" />
    );

};

export default Image;
