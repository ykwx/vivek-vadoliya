import React, { Component } from 'react';
import Image from './image'
import Loader from './common/loader'

class ImageModal extends Component {

    state = {
        item: "",
        type: "video",
        isLoaded: false,
        videoUrl: ""
    }

    componentDidMount() {
        const {modalContent, imageIndex} = this.props;
        let type, videoUrl;
        if (modalContent.asset[imageIndex].fields.videoLink !== undefined) {
            type = "video";
            videoUrl = this.getVideoUrl(modalContent.asset[imageIndex].fields.videoLink);
        } else {
            type = "image";
            videoUrl = "";
        }
        this.setState({
            item:modalContent.asset[imageIndex],
            type: type,
            videoUrl: videoUrl,
            isLoaded: true
        });
        console.log("loaded", this.state);
    }

    componentDidUpdate(prevProps, prevState) {
        const {modalContent, imageIndex} = this.props;
        if (prevProps.imageIndex !== imageIndex) {
            let type, videoUrl;
            if (modalContent.asset[imageIndex].fields.videoLink !== undefined) {
                type = "video";
                videoUrl = this.getVideoUrl(modalContent.asset[imageIndex].fields.videoLink);
            } else {
                type = "image";
                videoUrl = "";
            }
            this.setState({
                item:modalContent.asset[imageIndex],
                type: type,
                videoUrl: videoUrl,
                isLoaded: true
            });
        }

        console.log("reloaded", this.state);
    }

    getVideoUrl = (string) => {
        let videoUrl;
        return videoUrl = "https://player.vimeo.com/video" + string.split("vimeo.com")[1] + "?title=0&byline=0&portrait=0";
    }

    toggleIndex = (item) => {
        const {modalContent} = this.props;
        const index = modalContent.asset.findIndex(a => a.sys.id === item.sys.id);
        this.setState({
            item: "",
            isLoaded: false
        });

        // Click to see next image or loop back to start
        if (index + 1 < modalContent.asset.length) {
            let type, videoUrl;
            if (modalContent.asset[index + 1].fields.videoLink !== undefined) {
                type = "video";
                videoUrl = this.getVideoUrl(modalContent.asset[index + 1].fields.videoLink);
            } else {
                type = "image";
            }
            this.setState({
                item: modalContent.asset[index + 1],
                type: type,
                videoUrl: videoUrl,
                isLoaded: true
            });
        } else {
            let type, videoUrl;
            if (modalContent.asset[0].fields.videoLink != undefined) {
                type = "video";
                videoUrl = this.getVideoUrl(modalContent.asset[0].fields.videoLink);
            } else {
                type = "image";
            }
            this.setState({
                item: modalContent.asset[0],
                type: type,
                videoUrl: videoUrl,
                isLoaded: true
            });
        }
    }


    render() {

        const {showModal, modalContent, imageIndex, toggleModal} = this.props;
        const {item, type, videoUrl, isLoaded} = this.state;
        console.log("fired", this.state);
        return (
            <React.Fragment>
                {!isLoaded && (<Loader />)}
                {isLoaded && (
                    <div className={showModal === true ? "md-show modal-wrapper modal-wrapper-image" : "md-hide modal-wrapper"}>
                        <div className={`modal ${item.fields.backgroundColour}-bg`} onClick={() => this.toggleIndex(item)}>
                            <i className="material-icons close-trigger" onClick={() => toggleModal(false, item)}>close</i>
                            {type === "image" && (<Image imgAlt={item.fields.title} imgSrc={item.fields.media.fields.file.url} width={1200} />)}
                            {type !== "image" && (<div className="iframe-container"><iframe src={videoUrl}></iframe></div>)}
                        </div>
                        <div className="overlay" onClick={() => toggleModal(false, item)}></div>
                    </div>
                )}
            </React.Fragment>
        );
    }

}

export default ImageModal;
