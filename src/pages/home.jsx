import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import SEO from "../app/SEO";
import Config from "../app/Config";
import Contentful from '../app/Contentful'
import Image from '../components/image'
import HomeCanvas from '../components/homeCanvas'
import Loader from '../components/loader'

class Home extends Component {

    state = {
        isLoaded: false,
        entry: []
    }

    componentDidMount() {
        this.fetchEntry().then(this.setEntry);
    }

    fetchEntry = () => Contentful.getEntries({
        content_type: 'home',
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
        console.log(entry);

        return (
            <React.Fragment>
                <MetaTags>
                    <title>{Config.siteTitle}</title>
                    <meta name="description" content={Config.siteTitle} />
                    <meta property="og:title" content={Config.siteTitle} />
                    <meta property="og:image" content='../assets/images/meta-img.jpg' />
                </MetaTags>
                <SEO path={"/about"} content="" />
                <div className="page-wrapper">
                    <Link to="/projects">
                        <div className="half left-side full-height">
                            <div className="wrapper vert-align image-wrapper">
                            {!isLoaded && (<Loader />)}
                            {
                              isLoaded && (
                                <Image imgAlt={entry.fields.title} imgSrc={entry.fields.images[0].fields.file.url} width={720} />
                            )}
                            </div>
                        </div>
                    </Link>

                    <div className="half right-side black-bg full-height">
                        <HomeCanvas />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Home;
