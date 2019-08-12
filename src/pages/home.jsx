import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import SEO from "../app/SEO";
import Config from "../app/Config";
import Contentful from '../app/Contentful'
import Image from '../components/image'
import HomeCanvas from '../components/homeCanvas'
import Loader from '../components/loader'
import Modal from '../components/modal'

import metaImage from '../assets/images/meta-img.jpg'

class Home extends Component {

    state = {
        isLoaded: false,
        showModal: false,
        entry: [],
        imageIndex: 0
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

    handleMouseOver = (i, arrayLength) => e => {
        let val;
        if ( e.movementX < 0 || e.movementX > 0 || e.movementY < 0 || e.movementY > 0 ) {
            if (i + 1 == arrayLength) {
                val = 0;
            } else {
                val = i + 1;
            }
            this.setState({imageIndex: val});
        }
    }

    toggleModal = (val) => {
        this.setState({
            showModal: val,
        });
    }

    render() {
        const { entry, isLoaded, imageIndex } = this.state;

        if (entry && entry.fields) {
            const {images} = entry.fields
            return (
                <React.Fragment>
                    <MetaTags>
                        <title>{Config.siteTitle}</title>
                        <meta name="description" content={Config.siteTitle} />
                        <meta property="og:title" content={Config.siteTitle} />
                        <meta property="og:image" content={metaImage} />
                    </MetaTags>
                    <SEO path={"/about"} content="" />
                    <nav className="navigation" role="navigation">
                        <ul>
                            <li className="float-right">
                                <span className="emoji turban click" onClick={() => this.toggleModal(true)}>Open</span>
                            </li>
                        </ul>
                    </nav>
                    <Modal
                        showModal={this.state.showModal}
                        toggleModal={this.toggleModal}
                        content={"name"}
                    />
                    <div className="page-wrapper">
                        <Link to="/projects">
                            <div className="half left-side full-height">
                                <div className="wrapper vert-align image-wrapper home-slider">
                                  {images.map(({fields}, i) => {
                                      return (
                                          <div key={i} className={`home-slide ${i == imageIndex ? 'show-img' : 'hide-img' }`} onMouseMove={this.handleMouseOver(i, images.length)}>
                                              <Image imgAlt={fields.title} imgSrc={fields.file.url} width={720} />
                                          </div>
                                      )
                                  })}
                                </div>
                            </div>
                        </Link>
                        <div className="half right-side black-bg full-height hide-on-mobile">
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
