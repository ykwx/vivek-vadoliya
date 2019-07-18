import React, { Component } from 'react';
import Image from './image'
import Loader from './loader'

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
    }

    getVideoUrl = (string) => {
        let videoUrl;
        return videoUrl = "https://player.vimeo.com/video" + string.split("vimeo.com")[1] + "?title=0&byline=0&portrait=0";
    }

    toggleIndex = (item, dir) => {
        const {modalContent} = this.props;
        const index = modalContent.asset.findIndex(a => a.sys.id === item.sys.id);
        this.setState({
            item: "",
            isLoaded: false
        });

        // Which way are we going?
        let nextAsset, nextAssetVal;
        if (dir == "backwards") {
            nextAssetVal = index - 1;
            nextAsset = modalContent.asset[nextAssetVal]
        } else {
            nextAssetVal = index + 1
            nextAsset = modalContent.asset[nextAssetVal]
        }

        // Click to see next image or loop back to start
        if (nextAssetVal > 0 && nextAssetVal < modalContent.asset.length) {
            let type, videoUrl;
            if (nextAsset.fields.videoLink !== undefined) {
                type = "video";
                videoUrl = this.getVideoUrl(nextAsset.fields.videoLink);
            } else {
                type = "image";
            }
            this.setState({
                item: nextAsset,
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

        const {showImageModal, modalContent, imageIndex, toggleImageModal} = this.props;
        const {item, type, videoUrl, isLoaded} = this.state;
        return (
            <React.Fragment>
                {!isLoaded && (<Loader />)}
                {isLoaded && (
                    <div className={showImageModal === true ? "md-show modal-wrapper" : "md-hide modal-wrapper"}>
                        <div className={`modal ${item.fields.backgroundColour}-bg`}>
                            <i className="material-icons close-trigger" onClick={() => toggleImageModal(false, item)}>close</i>
                            {type === "image" && (<Image imgAlt={item.fields.title} imgSrc={item.fields.media.fields.file.url} width={720} />)}
                            {type !== "image" && (<div className="iframe-container"><iframe src={videoUrl}></iframe></div>)}
                            <div className="half forwards" onClick={() => this.toggleIndex(item, "forwards")}></div>
                            <div className="half backwards" onClick={() => this.toggleIndex(item, "backwards")}></div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }

}

export default ImageModal;
