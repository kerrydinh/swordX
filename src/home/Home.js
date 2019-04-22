
import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './home.css';
import { withFirebase } from '../firebase';

class Home extends Component {
    state = {}

    render() {
        const opts = {
            height: '600',
            width: '1000',
            playerVars: {
              autoplay: 1
            }
        };
          
        return (
            <div className="home-video">
                <h1 style={{textAlign: 'center'}}>Home Page</h1>
                <h3 style={{textAlign: 'center'}}>{ this.props.firebase.isAuthenticated() ? `Welcome you!!!` : 'Login to see something special :)'}</h3>
                    <YouTube
                         
                        videoId="Fo7XPvwRgG8"
                        opts={opts}
                    />
            </div>

        );
    }
}

export default withFirebase(Home);