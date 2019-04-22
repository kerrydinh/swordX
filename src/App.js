import React, { Component } from 'react';
import './App.css';
import Routing from './routing/Routing';
import { withFirebase } from './firebase';

class App extends Component {


  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },
    );
  }

  render() {
    return (
      <div>
        <Routing />
      </div>

    );
  }
}

export default withFirebase(App);
