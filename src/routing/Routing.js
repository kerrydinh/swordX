import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import Home from '../home/Home';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import Login from '../login/Login';
import SignUp from '../signup/SignUp';
import List from '../list/List';
import { withFirebase } from '../firebase';

class Routing extends Component {
  state = {  }
  render() { 
    return (
      <BrowserRouter>
      <div>
        <Navbar bg="light" expand="lg" className={{border: '1px solid #ccc'}}>
          <Link className="nav-link" to="/">Home</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              { this.props.firebase.isAuthenticated() ? <Link className="nav-link" to="/list">Customer</Link> : null }
            </Nav>
            <Form inline>
              { !this.props.firebase.isAuthenticated() ? <Link className="nav-link" to="/login">Sign In</Link> : null }
              { !this.props.firebase.isAuthenticated() ? <Link className="nav-link" to="/sign-up">Sign Up</Link> : null }
              { this.props.firebase.isAuthenticated() ? <span style={{paddingRight: '20px'}}>{this.props.firebase.currentUser()}</span> : null}
              { this.props.firebase.isAuthenticated() ? <Button variant="outline-success" onClick={this.props.firebase.doSignOut}>Sign Out</Button> : null }
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" render={() => (!this.props.firebase.isAuthenticated() ? <Login /> : (<Redirect to="/" />))}/>
          <Route path="/sign-up" render={() => (!this.props.firebase.isAuthenticated() ? <SignUp /> : (<Redirect to="/" />))}/>
          <Route path="/list" render={() => (this.props.firebase.isAuthenticated() ? <List /> : (<Redirect to="/" />))} />
        </Switch>

      </div>
    </BrowserRouter>
    );
  }
}
 
export default withFirebase(Routing);