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
        console.log(response.items);
        this.setState({
            entry: response.items[0],
            isLoaded: true
        })
    }


    render() {

        const { entry, isLoaded } = this.state;
        console.log(entry, entry.length);

        if (entry && entry.fields) {
            const {images} = entry.fields
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
                                <div className="wrapper vert-align image-wrapper home-slider">

                                  {images.map(({fields}, i) => {
                                      return (
                                          <Image key={i} imgAlt={fields.title} imgSrc={fields.file.url} width={720} />
                                      )
                                  })}

                                </div>
                            </div>
                        </Link>

                        <div className="half right-side black-bg full-height">
                            <HomeCanvas />
                        </div>
                    </div>
                </React.Fragment>
            )

        } else {
            return (<Loader />);
        }


    }
}

export default Home;
