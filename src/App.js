import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import classes from './App.module.css';
import Homepage from './components/Homepage/Homepage';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Switch>
          <Route path='/' exact component={Homepage} />
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }
}

export default App;