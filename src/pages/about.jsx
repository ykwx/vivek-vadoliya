import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import SEO from "../app/SEO";
import Config from "../app/Config";
import Contentful from '../app/Contentful'
import * as Markdown from 'react-markdown'
import Loader from '../components/loader'
import Navigation from '../components/navigation'
import Modal from '../components/modal'

import metaImage from '../assets/images/meta-img.jpg'

class About extends Component {

    state = {
        isLoaded: false,
        showModal: false,
        entry: []
    }

    componentDidMount() {
        this.fetchEntry().then(this.setEntry);
    }

    fetchEntry = () => Contentful.getEntries({
        content_type: 'about',
        limit: 1,
        order: 'sys.createdAt'

    })

    setEntry = response => {
        this.setState({
            entry: response.items[0],
            isLoaded: true
        })
    }

    toggleModal = (val) => {
        this.setState({
            showModal: val,
        });
    }

    render() {

        const { entry, isLoaded } = this.state;
        const pageTitle = "About"

        return (
            <React.Fragment>
            <MetaTags>
                <title>{pageTitle} | {Config.siteTitle}</title>
                <meta name="description" content={Config.siteTitle} />
                <meta property="og:title" content={Config.siteTitle} />
                <meta property="og:image" content={metaImage} />
            </MetaTags>
            <SEO path={"/about"} content="" />
            {!isLoaded && (<Loader />)}
            {isLoaded && (
                <React.Fragment>
                    <Navigation toggleModal={this.toggleModal} />
                    <Modal
                        showModal={this.state.showModal}
                        toggleModal={this.toggleModal}
                        content={"about"}
                    />
                    <div className="about-page page-wrapper black-bg">
                        <div className="contact-row white-text">
                            <h4>
                                <a href="mailto:vivekvadoliya@me.com" target="_blank">vivekvadoliya@me.com</a>
                            </h4>
                            <h4>
                                <a href="https://instagram.com/vivekvad" target="_blank">Instagram</a>
                            </h4>
                        </div>

                        <div className="half push-down black-bg">
                            <div className="wrapper">
                                <div className="text-body">
                                    <div className="text-block white-text body-text">
                                        <p className="body-text_english">{entry.fields.body}</p>
                                        <p className="body-text_hindi">{entry.fields.bodyHindi}</p>
                                    </div>
                                </div>
                                <div className="text-block white-text">
                                    <h4>Clients</h4>
                                    <Markdown source={entry.fields.clients} />
                                </div>
                                <div className="text-block white-text">
                                    <h4>Publications</h4>
                                    <Markdown source={entry.fields.publications} />
                                </div>
                                <div className="text-block white-text">
                                    <h4>Shows</h4>
                                    <Markdown source={entry.fields.shows} />
                                </div>
                                <div className="text-block white-text">
                                    <h4>Press</h4>
                                    <Markdown source={entry.fields.press} />
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )}
            </React.Fragment>
        );
    }

}

export default About;
