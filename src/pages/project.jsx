import React, { Component } from 'react';
import Helmet from 'react-helmet'
import SEO from "../app/SEO";
import Config from "../app/Config";
import Contentful from '../app/Contentful'

import * as Markdown from 'react-markdown'

import ProjectToggle from '../components/projectToggle'
import ProjectArrows from '../components/projectArrows'
import Image from '../components/image'
import Loader from '../components/common/loader'
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
            displayStyle: 'grid',
            showModal: false
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

        let metaImage = ""
        if (data.fields.asset && data.fields.asset[0].fields.media) {
            let metaImage = data.fields.asset[0].fields.media.fields.file.url
        }

        this.setState({
            isLoaded: true,
            fields: data.fields,
            meta: data.sys,
            seo: {
                title: `${data.fields.title} | ${Config.siteTitle}`,
                description: data.fields.overview,
                image: metaImage
            }
        })
    }

    handleClick = val => {
        this.setState({
            displayStyle: val
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
        const { fields, isLoaded, displayStyle, showModal } = this.state;
        let assetSlide

        if (fields && fields.asset != null && this.state.displayStyle == 'slide') {
            assetSlide = fields.asset.map((item, key, arr) => {
                if (item.fields) {
                    if (item.fields.media && item.fields.media.fields.file.contentType === "image/jpeg") {
                        // Image
                        return (
                            <div className={`image-block full-height ${item.fields.backgroundColour}-bg ${item.fields.width} ${key === 0 ? 'first' : '' } ${arr.length - 1 === key ? 'last' : '' }`} key={key}>
                                <div className="image-wrapper vert-align">
                                    <Image imgAlt={item.title} imgSrc={item.fields.media.fields.file.url} />
                                </div>
                                <div className="image-count center-text">{key + 1} / {fields.asset.length}</div>

                                <div className="arrow arrow-left" onClick={() => this.handleMove(item.width, 'left')}></div>
                                <div className="arrow arrow-right" onClick={() => this.handleMove(item.width, 'right')}></div>
                            </div>
                        );
                    } else if (item.fields.media && item.fields.media.fields.file.contentType != "image/jpeg") {
                        // Video
                        return (
                            <div className={`image-block full-height ${item.fields.backgroundColour}-bg ${item.fields.width} ${key === 0 ? 'first' : '' } ${arr.length - 1 === key ? 'last' : '' }`} key={key}>
                                <div className="image-wrapper vert-align">
                                    <video alt={item.title} src={item.fields.media.fields.file.url} autoplay="true" muted loop/>
                                </div>
                                <div className="image-count center-text">{key + 1} / {fields.asset.length}</div>
                                <div className="arrow arrow-left" onClick={() => this.handleMove(item.width, 'left')}></div>
                                <div className="arrow arrow-right" onClick={() => this.handleMove(item.width, 'right')}></div>
                            </div>
                        );
                    } else {
                        // Video link
                        return (
                            <div className={`image-block full-height ${item.fields.backgroundColour}-bg ${item.fields.width} ${key === 0 ? 'first' : '' } ${arr.length - 1 === key ? 'last' : '' }`} key={key}>
                                <div className="image-wrapper vert-align">
                                    <iframe alt={item.title} src={item.videoLink} autoplay="true" muted loop/>
                                </div>
                                <div className="image-count center-text">{key + 1} / {fields.asset.length}</div>
                                <div className="arrow arrow-left" onClick={() => this.handleMove(item.width, 'left')}></div>
                                <div className="arrow arrow-right" onClick={() => this.handleMove(item.width, 'right')}></div>
                            </div>
                        );
                    }
                } else {
                    return null;
                }

            });

        } else {
            assetSlide = null
        }

        let assetGrid
        if (fields && fields.asset != null && this.state.displayStyle == 'grid') {
            assetGrid = fields.asset.map((item, key) => {
                if (item.fields) {
                    if (item.fields.media && item.fields.media.fields.file.contentType === "image/jpeg") {
                        return (
                            <div className="image-block" key={key}>
                                <Image imgAlt={item.title} imgSrc={item.fields.media.fields.file.url} />
                            </div>
                        );
                    } else if (item.fields.media && item.fields.media.fields.file.contentType !== "image/jpeg") {
                        // Video
                        return (
                            <div className="image-block" key={key}>
                                <video alt={item.title} src={item.fields.media.fields.file.url} autoplay="true" muted loop/>
                            </div>
                        );
                    } else {
                        // Video link
                        return (
                            <div className="image-block" key={key}>
                                <iframe alt={item.title} src={item.videoLink} autoplay="true" muted loop/>
                            </div>
                        );
                    }
                } else {
                    return null;
                }

            });
        } else {
            assetGrid = null
        }

        return (
            <React.Fragment>
                <SEO path={`/work/${fields.slug}`} content={this.state.seo} />
                {!isLoaded && (<Loader />)}
                {
                  isLoaded && (
                    <article>
                        <ProjectToggle
                            displayStyle={displayStyle}
                            onSwitch={this.handleClick}
                        />



                        <div className={`post ${displayStyle}`}>
                            <div className="text-wrapper half full-height">
                                <div className="text-container">
                                    <div className="text-block">
                                        <h1>{fields.title}</h1>
                                        <Markdown source={fields.body} />
                                    </div>
                                </div>
                            </div>

                            {assetSlide}

                            <div className="grid-wrapper">
                                {assetGrid}
                            </div>

                        </div>
                    </article>


                  )
                }
                </React.Fragment>
          )
    }

}

export default Project;
