import React, { Component } from 'react';
import Helmet from 'react-helmet'
import SEO from "../app/SEO";
import Config from "../app/Config";
import Contentful from '../app/Contentful'

import ProjectItem from '../components/projectItem'
import Image from '../components/image'
import Loader from '../components/common/loader'


class Projects extends Component {
    state = {
        isLoaded: false,
        entries: [],
        img: {
            alt: 'Vivek Vadoliya',
            src: undefined,
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
            entries: response.items
        })
    }

    handleMouseOver = entry => e => {
        let img
        console.log(entry);

        if (entry.asset && entry.asset.length > 0) {
            if (entry.asset[0].fields.media) {
                img = entry.asset[0].fields.media.fields.file.url
            } else {
                img = ''
            }
        }

        this.setState({
            img: {
                alt: entry.title,
                src: img,
                link: "/projects/" + entry.slug
            }
        });

    }


    render() {

        const pageTitle = "Projects"
        const { entries } = this.state;

        if (entries && entries.length) {
            const { entries } = this.state;

            let { alt, src, link } = this.state.img;
            if (src === undefined) {
                src = entries[0].fields.asset[0].fields.media.fields.file.url;
            }

            const personal = entries.filter(item => item.fields.tag.fields.slug === 'personal');
            const editorial = entries.filter(item => item.fields.tag.fields.slug === 'editorial-commissions');
            const commercial = entries.filter(item => item.fields.tag.fields.slug === 'commercial');

            return (
                <React.Fragment>
                    <div className="page-wrapper green-bg">
                        <Helmet>
                              <title>{pageTitle} | {Config.siteTitle}</title>
                        </Helmet>
                        <div className="half left-side black-bg push-down">
                            <div className="wrapper center-text">

                                <ul className="article-list">
                                    <h4>Personal</h4>
                                    {personal.map(({fields}, i) => {
                                        return (
                                            <li key={i} onMouseOver={this.handleMouseOver(fields)}>
                                                <ProjectItem {...fields} />
                                            </li>
                                        )
                                    })}
                                </ul>

                                <ul className="article-list">
                                    <h4>Editorial Commissions</h4>
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

                        <div className="half right-side full-height green-bg locked">
                            <div className="image-wrapper wrapper vert-align">
                                <Image imgAlt={alt} imgSrc={src} />
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
