import React, { Component } from 'react';
import { SplitColorChannelText } from 'react-text-fun';

class Modal extends Component {

    constructor(props) {
        super(props);

        this.state = { x: 0, y: 0 };
    }

    _onMouseMove(e) {
        this.setState({ x: e.screenX, y: e.screenY });
    }

    _onTouchMove(e) {
        this.setState({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        });
    }

    render() {
        var xVal = (0.15 * Math.abs((this.state.x - (window.innerWidth / 2)) / window.innerWidth));
        if (xVal < 0.01) { xVal = 0.01; }

        return (
            <div className={this.props.showModal === true ? 'md-show modal-wrapper' : 'md-hide modal-wrapper'}>
                <div className="modal" onMouseMove={this._onMouseMove.bind(this)} onTouchMove={this._onTouchMove.bind(this)} >
                    <i className="material-icons close-trigger" onClick={() => this.props.toggleModal(false)}>close</i>
                    <div className="text-wrap" >
                        {this.props.content === "about" &&
                            <React.Fragment>
                                <p>
                                    Vivek Vadoliya is a British Indian documentary and portrait photographer & director. Currently he is based between London and Berlin.
                            </p>
                                <p>
                                    <a href="mailto:vivekvadoliya@me.com">vivekvadoliya@me.com</a>
                                    <br />
                                    <a href="https://instagram.com/vivekvad" target="_blank">Instagram</a>
                                </p>
                            </React.Fragment>
                        }
                        {this.props.content === "name" &&
                            <React.Fragment
                            >
                                <SplitColorChannelText
                                    text="Vivek*"
                                    // fontFamily= "HK"
                                    fontSize={120}
                                    rotation={this.state.y / 10}
                                    rgbOffset={
                                        xVal
                                    }
                                    addBlur={true}
                                    addNoise={true}
                                    fill="black"
                                    paddingLeft={20}
                                    paddingRight={20}
                                    paddingTop={20}
                                    paddingBottom={20}
                                >
                                </SplitColorChannelText>
                                A name of Sanskrit origin meaning Man of Wisdom, Respect & Knowledge
                        </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        );
    }
};
export default Modal;
