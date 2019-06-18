import React, { Component } from 'react';
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom';
import SEO from "../app/SEO";
import Config from "../app/Config";
import Contentful from '../app/Contentful'

import ProjectItem from '../components/projectItem'
import Image from '../components/image'
import Loader from '../components/common/loader'
import Navigation from '../components/common/navigation'


class Projects extends Component {
    state = {
        isLoaded: false,
        entries: [],
        img: {
            alt: 'Vivek Vadoliya',
            src: undefined,
            type: "image/jpeg",
            link: '/projects'
        }
    }

    componentDidMount() {
        this.fetchPosts().then(this.setPosts);
    }

    fetchPosts = () => Contentful.getEntries({
        content_type: 'blogPost',
        skip: 0,
        limit: 100,
        order: 'sys.createdAt'
    })

    setPosts = response => {
        this.setState({
            isLoaded: true,
            entries: response.items,
            img: {
                alt: 'Vivek Vadoliya',
                src: undefined,
                type: "image/jpeg",
                link: "projects/" + response.items[0].fields.slug
            }
        })
    }

    handleMouseOver = entry => e => {
        let img;
        let type;

        if (entry.heroAsset) {
            img = entry.heroAsset.fields.media.fields.file.url
            type = entry.heroAsset.fields.media.fields.file.contentType
            console.log(type);
        } else {
            img = ''
            type = "image/jpeg"
        }


        this.setState({
            img: {
                alt: entry.title,
                src: img,
                type: type,
                link: "/projects/" + entry.slug
            }
        });

    }


    render() {

        const pageTitle = "Projects"
        const { entries } = this.state;

        if (entries && entries.length) {
            const { entries } = this.state;

            let { alt, src, type, link } = this.state.img;
            if (src === undefined) {
                src = entries[0].fields.heroAsset.fields.media.fields.file.url;
            }

            const personal = entries.filter(item => item.fields.tag.fields.slug === 'overview');
            const editorial = entries.filter(item => item.fields.tag.fields.slug === 'selected-projects');
            const commercial = entries.filter(item => item.fields.tag.fields.slug === 'commercial');

            return (
                <React.Fragment>
                    <div className="page-wrapper white-bg">
                        <Helmet>
                              <title>{pageTitle} | {Config.siteTitle}</title>
                        </Helmet>
                        <Navigation />
                        <div className="half left-side black-bg push-down">
                            <div className="wrapper center-text">

                                <ul className="article-list">
                                    <h4>Overview</h4>
                                    {personal.map(({fields}, i) => {
                                        return (
                                            <li key={i} onMouseOver={this.handleMouseOver(fields)}>
                                                <ProjectItem {...fields} />
                                            </li>
                                        )
                                    })}
                                </ul>

                                <ul className="article-list">
                                    <h4>Personal Projects</h4>
                                    {editorial.map(({fields}, i) => {
                                        return (
                                            <li key={i} onMouseOver={this.handleMouseOver(fields)}>
                                                <ProjectItem {...fields} />
                                            </li>
                                        )
                                    })}
                                </ul>
                                <ul className="article-list">
                                    <h4>Commercial</h4>
                                    {commercial.map(({fields}, i) => {
                                        return (
                                            <li key={i} onMouseOver={this.handleMouseOver(fields)}>
                                                <ProjectItem {...fields} />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>

                        <div className="half right-side full-height locked hide-on-mobile">
                            <div className="image-wrapper wrapper vert-align">
                                <Link to={link}>
                                    {type === "image/jpeg" && (<Image imgAlt={alt} imgSrc={src} width={720} />)}
                                    {type !== "image/jpeg" && (<span className="image-wrap"><video alt={alt} src={src} width={720} autoplay="true" muted loop/></span>)}
                                </Link>
                            </div>
                        </div>


                    </div>
                </React.Fragment>
            );

        } else {
            return (<Loader />);
        }

    }
}

export default Projects;
