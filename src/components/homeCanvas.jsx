import React from 'react'

import imageEnglish from '../assets/images/vv-english.png'
import imageHindi from '../assets/images/vv-hindi.png'

const HomeCanvas = () => (

    <div className="vv-distort-bg distortion">
        <div className="vv-distort-img"
        data-displacement="../assets/images/displacement/4.png" data-intensity="0.2" data-speedIn="1.6" data-speedOut="1.6">
            <img src={imageEnglish} alt="Image"/>
            <img src={imageHindi} alt="Image"/>
        </div>
    </div>
    
)

export default HomeCanvas
