import React, { Component } from 'react';
import classes from './App.module.css';
import Navigation from './components/Navigation/Navigation';
import Layout from './components/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Navigation />
        <Layout />
      </div>
    );
  }
}

export default App;