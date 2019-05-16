import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navigation from './components/common/navigation'
import Modal from './components/common/modal'
import Home from './pages/home'
import About from './pages/about'
import Project from './pages/project'
import Projects from './pages/projects'
import NotFound from './pages/not-found'

class App extends Component {

    state = {
        showModal: false,
        modalContent:
            <div>
                <h3>Vivek Vadoliya</h3>
                <p>Drop me a line to talk about a project</p>
            </div>
    }

    handleClick = val => {
        this.setState({
            showModal: val
        });
    }

    render() {

        return (
            <React.Fragment>
                <Navigation
                    toggleModal={this.handleClick}
                />
                <Modal
                    modalContent={this.state.modalContent}
                    showModal={this.state.showModal}
                    toggleModal={this.handleClick}
                />
                <main className="container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/projects" component={Projects} />
                        <Route path="/projects/:slug" component={Project} />
                        <Route path="/not-found" component={NotFound} />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
