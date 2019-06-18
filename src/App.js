import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/home'
import About from './pages/about'
import Project from './pages/project'
import Projects from './pages/projects'
import NotFound from './pages/not-found'

class App extends Component {

    render() {
        return (
            <React.Fragment>
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
