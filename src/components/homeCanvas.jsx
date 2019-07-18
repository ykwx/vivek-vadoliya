import React, { Component } from 'react';

import imageEnglish from '../assets/images/vivek-english.svg';
import imageHindi from '../assets/images/vivek-hindi.svg';

class HomeCanvas extends Component {
    componentDidMount() {
        this.updateCanvas();
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


    render() {
        return (
            <React.Fragment>
                <figure className="canvasContainer">
                    <canvas className="vert-align" id="canvas" ref="canvas" width="750" height="750"></canvas>
                </figure>
            </React.Fragment>
        );
    }

}

export default HomeCanvas;
