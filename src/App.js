import React, { Component } from 'react';
import './App.css';
import Chat from './components/chat';
import Login from './login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './login/Register';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Route path="/chat" component={Chat} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
