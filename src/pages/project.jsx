import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import SEO from "../app/SEO";
import Config from "../app/Config";
import Contentful from '../app/Contentful'

import * as Markdown from 'react-markdown'

import Image from '../components/image'
import Loader from '../components/loader'
import Navigation from '../components/navigation'
import Modal from '../components/modal'
import ImageModal from '../components/imageModal'


class Project extends Component {

    constructor(props) {
        super(props);

        const slug = props.match.params.slug

        this.state = {
            isLoaded: false,
            slug: slug,
            fields: [],
            meta: [],
            seo: [],
            showModal: false,
            showImageModal: false,
            overviewProject: false,
            assetLength: 0,
            imageIndex: 0
        };
    }

    componentDidMount() {
        this.fetchEntry().then(this.setEntry);
    }

    fetchEntry = () => Contentful.getEntries({
        content_type: 'blogPost',
        skip: 0,
        limit: 1,
        order: 'sys.createdAt',
        "fields.slug": this.state.slug,
    })

    setEntry = response => {
        const data = response.items[0];

        let metaImage = "";
        let overviewProjectVal, assetLengthVal;
        if (data.fields.asset && data.fields.asset[0].fields.media) {
            let metaImage = data.fields.asset[0].fields.media.fields.file.url
            assetLengthVal = data.fields.asset.length;
        } else {
            assetLengthVal = 1;
        }

        if (data.fields.tag.fields.slug === 'overview') {
            overviewProjectVal = true;
        } else {
            overviewProjectVal = false;
        }

        this.setState({
            isLoaded: true,
            overviewProject: overviewProjectVal,
            assetLength: assetLengthVal,
            fields: data.fields,
            meta: data.sys,
            seo: {
                title: `${data.fields.title} | ${Config.siteTitle}`,
                description: data.fields.overview,
                image: metaImage
            }
        })
    }

    toggleModal = (val) => {
        this.setState({
            showModal: val,
        });
    }

    toggleImageModal = (val, item) => {
        const index = this.state.fields.asset.findIndex(a => a.sys.id === item.sys.id);
        this.setState({
            showImageModal: val,
            imageIndex: index
        });
    }

    handleMove = (width, dir) => {
        const windowWidth = window.innerWidth;
        if (width === 'half-width') {
            if (dir === 'right') {
                window.scrollBy({top: 0,left: (windowWidth / 2),behavior: 'smooth'});
            } else {
                window.scrollBy({top: 0,left: -(windowWidth / 2),behavior: 'smooth'});
            }
        } else {
            if (dir === 'right') {
                window.scrollBy({top: 0,left: windowWidth,behavior: 'smooth'});
            } else {
                window.scrollBy({top: 0,left: -windowWidth,behavior: 'smooth'});
            }
        }
    }

    render() {
        const { fields, isLoaded, showModal, showImageModal, overviewProject, assetLength } = this.state;

        let assets
        if (fields && fields.asset != null) {

            assets = fields.asset.map((item, key) => {
                if (item.fields) {
                    if (item.fields.media && item.fields.media.fields.file.contentType === "image/jpeg") {
                        let width;
                        if (this.state.assetLength == 1) {
                            width = 920;
                        } else {
                            width = 320;
                        }
                        return (
                            <div className="image-block click" key={key} onClick={() => this.toggleImageModal(true, item)}>
                                <Image imgAlt={item.title} imgSrc={item.fields.media.fields.file.url} width={width} />
                            </div>
                        );
                    } else if (item.fields.media && item.fields.media.fields.file.contentType !== "image/jpeg") {
                        // Video
                        return (
                            <div className="image-block click" key={key} onClick={() => this.toggleImageModal(true, item)}>
                                <span className="image-wrap video-wrap"><video alt={item.title} src={item.fields.media.fields.file.url} autoPlay={true} muted loop/></span>
                            </div>
                        );
                    } else {
                        // Video link
                        const videoSrc = "https://player.vimeo.com/video" + item.fields.videoLink.split("vimeo.com")[1];
                        return (
                            <div className="image-block click" key={key} onClick={() => this.toggleImageModal(true, item)}>
                                <span className="image-wrap"><iframe alt={item.fields.title} src={videoSrc} /></span>
                            </div>
                        );
                    }
                } else {
                    return null;
                }

            });
        } else {
            assets = null
        }

        return (
            <React.Fragment>
                <SEO path={`/work/${fields.slug}`} content={this.state.seo} />
                {!isLoaded && (<Loader />)}
                {isLoaded && (
                    <React.Fragment>
                        <MetaTags>
                            <title>{fields.title} | {fields.title}</title>
                            <meta name="description" content={fields.body} />
                            <meta property="og:title" content={fields.title} />
                            <meta property="og:image" content={fields.heroAsset.fields.media.fields.file.url} />
                        </MetaTags>
                        <Navigation toggleModal={this.toggleModal} />
                        <Modal
                            showModal={this.state.showModal}
                            toggleModal={this.toggleModal}
                            content={"about"}
                        />
                        <article>
                            <ImageModal
                                modalContent={fields}
                                imageIndex={this.state.imageIndex}
                                showImageModal={this.state.showImageModal}
                                toggleImageModal={this.toggleImageModal}
                            />

                            <div className="post grid">
                                {!overviewProject &&
                                    <div className={`text-wrapper half full-height ${fields.body.length > 800 ? 'no-flex' : 'flex'}`}>
                                        <div className="text-container">
                                            <div className="text-block">
                                                <h1>{fields.title}</h1>
                                                <Markdown source={fields.body} />
                                            </div>
                                        </div>
                                    </div>
                                }

                                <div className={`grid-wrapper ${overviewProject ? 'full' : 'half' } ${assetLength == 1 ? "single-asset" : "multi-asset"} ${assetLength > 8 ? "not-fixed" : ""}`}>
                                    {assets}
                                </div>

                            </div>
                        </article>
                    </React.Fragment>
                )}
            </React.Fragment>
          )
    }

}

export default Project;
