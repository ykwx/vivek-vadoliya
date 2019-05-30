import React, { Component } from 'react';
import Helmet from 'react-helmet'
import SEO from "../app/SEO";
import Config from "../app/Config";
import Contentful from '../app/Contentful'
import * as Markdown from 'react-markdown'
import Loader from '../components/common/loader'

class About extends Component {

    state = {
        isLoaded: false,
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

    render() {

        const { entry, isLoaded } = this.state;
        const pageTitle = "About"
        console.log(entry);

        return (
            <React.Fragment>
            <Helmet>
                  <title>{pageTitle} | {Config.siteTitle}</title>
            </Helmet>
                <SEO path={"/about"} content="" />
                {!isLoaded && (<Loader />)}
                {
                  isLoaded && (
                    <div className="about-page page-wrapper pink-bg">
                        <div className="contact-row white-text">
                            <h4>
                                <a href="mailto:studio@vivekvadoliya.com" target="_blank">studio@vivekvadoliya.com</a>
                            </h4>
                            <h4>
                                <a href="https://instagram.com/vivekvad" target="_blank">@vivekvad</a>
                            </h4>
                        </div>

                        <div className="full push-down black-bg">
                            <div className="wrapper">
                                <div className="text-body">
                                    <div className="text-block white-text body-text">
                                        <p className="body-text_english">{entry.fields.body}</p>
                                        <p className="body-text_hindi">{entry.fields.bodyHindi}</p>
                                    </div>
                                </div>
                                <div className="text-block white-text">
                                    <h4>Clients</h4>
                                    <p>{entry.fields.clients}</p>
                                </div>
                                <div className="text-block white-text">
                                    <h4>Publications</h4>
                                    <p>{entry.fields.publications}</p>
                                </div>
                                <div className="text-block white-text">
                                    <h4>Shows</h4>
                                    <p>{entry.fields.shows}</p>
                                </div>
                                <div className="text-block white-text">
                                    <h4>Press</h4>
                                    <p>{entry.fields.press}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            </React.Fragment>
        );
    }

}

export default About;
