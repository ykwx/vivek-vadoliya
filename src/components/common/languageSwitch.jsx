import React from 'react';
import hoverEffect from '../hover.jsx';
import './languageSwitch.css';
class LanguageSwitch extends React.Component {
    componentDidMount() {
        Array.from(document.querySelectorAll('.grid__item-img')).forEach((el) => {
            const imgs = Array.from(el.querySelectorAll('img'));
            new hoverEffect({
                parent: el,
                intensity: el.dataset.intensity || undefined,
                speedIn: el.dataset.speedin || undefined,
                speedOut: el.dataset.speedout || undefined,
                easing: el.dataset.easing || undefined,
                hover: el.dataset.hover || undefined,
                image1: imgs[0].getAttribute('src'),
                image2: imgs[1].getAttribute('src'),
                displacementImage: el.dataset.displacement
            });
        });
    }

    render() {
        return (
            <div className="grid__item-img"
                data-displacement={this.props.imgDisplacement}
                data-intensity={this.props.dataIntensity}
                data-speedIn={this.props.dataSpeedIn}
                data-speedOut={this.props.dataSpeedOut}>
                <img src={this.props.img1} alt="Image" />
                <img src={this.props.img2} alt="Image" />
            </div>
        )
    }
}

export default LanguageSwitch;
