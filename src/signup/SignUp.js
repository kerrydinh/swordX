import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { connect } from 'react-redux';
import { getCreatedAccount } from '../redux/selector';
import { withFirebase } from '../firebase';
import { signUp } from '../redux/action';

const initialState = {
    email: '',
    password: '',
    rePassword: '',
    displayName: '',
    error: {},
    pristine: {
        email: true,
        password: true,
        rePassword: true,
        displayName: true
    }
};

class SignUp extends Component {
    state = initialState;

    onFieldChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const pristine = this.state.pristine;
        if (pristine[name]) {
            pristine[name] = false;
        }
        this.setState({ pristine: pristine })

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    onSubmit = event => {
        event.preventDefault();


        if (this.isValid()) {
            const userData = {
                displayName: this.state.displayName,
                email: this.state.email,
                password: this.state.password
            };

            this.props.signUp(this.props.firebase, userData);
        }
    };

    isValid() {
        return (!this.state.pristine.displayName &&
            !this.state.error.displayName &&
            !this.state.pristine.email &&
            !this.state.error.email &&
            !this.state.pristine.password &&
            !this.state.error.password &&
            !this.state.pristine.rePassword &&
            !this.state.error.rePassword);

    }


    validateField(fieldName, value) {
        const error = this.state.error ? this.state.error : {};
        switch (fieldName) {
            case 'displayName':
                error.displayName = value.length >= 6 && value.length < 32 ? null : 'Display name length should be 6 - 32 characters';
                break;
            case 'email':
                error.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? null : 'Email is invalid';
                break;
            case 'password':
                error.password = value.length >= 6 ? null : 'Password is too short';
                break;
            case 'rePassword':
                error.rePassword = value.length >= 6 ? null : 'Confirm Password is too short';
                if (this.state.error && !this.state.error.password)
                    error.rePassword = this.state.password === value ? null : 'Confirm password must be the same with password';
                break;
            default:
                break;
        }
        this.setState({
            error: error
        });
    }

    render() {
        const {
            displayName,
            email,
            password,
            rePassword,
            error,
            pristine
        } = this.state;

        return (
            <div>
                <Container>

                    <Row className="justify-content-md-center">
                        <Col md="5" style={{ padding: '30px 20px 30px 20px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '20px', background: "#fff"}}>
                            <h1>Sign Up</h1>
                            <Form onSubmit={this.onSubmit} className="">
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Display Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter display name" name="displayName"
                                        value={displayName}
                                        onChange={this.onFieldChange}
                                        className={pristine.displayName ? '' : (error.displayName ? 'is-invalid' : 'is-valid')} />
                                    <Form.Control.Feedback type="invalid">{error.displayName}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name="email"
                                        value={email}
                                        onChange={this.onFieldChange}
                                        className={pristine.email ? '' : (error.email ? 'is-invalid' : 'is-valid')} />
                                    <Form.Text className="text-muted"> We'll never share your email with anyone else.</Form.Text>
                                    <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password"
                                        value={password}
                                        onChange={this.onFieldChange}
                                        className={pristine.password ? '' : (error.password ? 'is-invalid' : 'is-valid')} />
                                    <Form.Control.Feedback type="invalid">{error.password}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formRePassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Password" name="rePassword"
                                        value={rePassword}
                                        onChange={this.onFieldChange}
                                        className={pristine.rePassword ? '' : (error.rePassword ? 'is-invalid' : 'is-valid')} />
                                    <Form.Control.Feedback type="invalid">{error.rePassword}</Form.Control.Feedback>
                                </Form.Group>
                                <Button variant={this.isValid() ? 'primary': 'secondary'}  type="submit" className="col-12 col-sm-5">Sign Up</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>;

        </div>
        );
    }
}

const mapStatetoProps = state => {
    const createdAccount = getCreatedAccount(state);
    return {
        createdAccount: createdAccount
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signUp: (firebaseService, data) => dispatch(signUp(firebaseService, data))
    }
}

export default connect(
    mapStatetoProps,
    mapDispatchToProps
)(withFirebase(SignUp));