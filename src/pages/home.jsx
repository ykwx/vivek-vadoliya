import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Helmet from 'react-helmet'
import SEO from "../app/SEO";
import Config from "../app/Config";
import Contentful from '../app/Contentful'
import Loader from '../components/common/loader'

import imageEnglish from '../assets/images/vivek-english.svg';
import imageHindi from '../assets/images/vivek-hindi.svg';

class Home extends Component {

    state = {
        isLoaded: false,
        entry: []
    }


    componentDidMount() {
        this.updateCanvas();
        this.fetchEntry().then(this.setEntry);
    }

    updateCanvas() {

        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        let brushRadius = (canvas.width / 100) * 5

        if (brushRadius < 50) {
            brushRadius = 50
        }

        // Create a new image
        let img = new Image();
        img.src = imageEnglish;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        }

        // Find bruch position
        let getBrushPos = '';
        getBrushPos = (xRef, yRef) => {
            let canvasRect = canvas.getBoundingClientRect();
            return {
                x: Math.floor((xRef-canvasRect.left)/(canvasRect.right-canvasRect.left) * canvas.width),
                y: Math.floor((yRef-canvasRect.top)/(canvasRect.bottom-canvasRect.top) * canvas.height)
            };
        }

        // Draw the dot
        let drawDot = '';
        let mouseX = 0;
        let mouseY = 0;
        drawDot = (mouseX, mouseY) => {
            console.log('drawDot');
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, brushRadius, 0, 2*Math.PI, true);
            ctx.fillStyle = '#000';
            ctx.globalCompositeOperation = "destination-out";
            ctx.fill();
        }

        // Find click position
        let detectLeftButton = '';
        detectLeftButton = (event) => {
            if ('buttons' in event) {
                return event.buttons === 1;
            } else if ('which' in event) {
                return event.which === 1;
            } else {
                return event.button === 1;
            }
        }

        canvas.addEventListener("mousemove", function(e) {
        	var brushPos = getBrushPos(e.clientX, e.clientY);
            var leftBut = detectLeftButton(e);
            if (leftBut == 1) {
        		drawDot(brushPos.x, brushPos.y);
            }
        }, false);

        canvas.addEventListener("touchmove", function(e) {
            e.preventDefault();
            var touch = e.targetTouches[0];
            if (touch) {
            var brushPos = getBrushPos(touch.pageX, touch.pageY);
                drawDot(brushPos.x, brushPos.y);
            }
        }, false);

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
                <Helmet>
                      <title>{Config.siteTitle}</title>
                </Helmet>
                <SEO path={"/about"} content="" />
                <div className="page-wrapper grey-bg">
                    <Link to="/projects">
                        <div className="half left-side grey-bg full-height">
                            <div className="wrapper vert-align image-wrapper">
                            {!isLoaded && (<Loader />)}
                            {
                              isLoaded && (
                                <img alt={entry.fields.title} src={entry.fields.image.fields.file.url} />
                            )}
                            </div>
                        </div>
                    </Link>

                    <div className="half right-side black-bg full-height">
                        <figure className="canvasContainer">
                            <canvas className="vert-align" id="canvas" ref="canvas" width="750" height="750"></canvas>
                        </figure>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Home;
