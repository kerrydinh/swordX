import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withFirebase } from '../firebase';

const initialState = {
    email: '',
    password: '',
    error: {},
    mainError: '',
    pristine: {
        email: true,
        password: true,
    }
};


class Login extends Component {
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

    validateField(fieldName, value) {
        const error = this.state.error ? this.state.error : {};
        switch (fieldName) {
            case 'email':
                error.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? null : 'Email is invalid';
                break;
            case 'password':
                error.password = value.length >= 6 ? null : 'Password is too short';
                break;
            default:
                break;
        }
        this.setState({
            error: error
        });
    }

    onSubmit = event => {

        event.preventDefault();
        if (this.isValid()) {
            this.props.firebase
                .doSignInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    this.setState({ ...initialState });
                })
                .catch(error => {
                    this.setState({ mainError: 'Wrong username or password' });
                });

            event.preventDefault();
        }
    };

    isValid() {
        return (
            !this.state.pristine.email &&
            !this.state.error.email &&
            !this.state.pristine.password &&
            !this.state.error.password);
    }

    render() {
        const {
            email,
            password,
            error,
            pristine,
            mainError
        } = this.state;

        return (
            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="5" style={{ padding: '30px 20px 30px 20px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '20px', background: "#fff" }}>
                            <h1>Sign In</h1>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name="email"
                                        value={email}
                                        onChange={this.onFieldChange}
                                        className={pristine.email ? '' : (error.email ? 'is-invalid' : 'is-valid')} />
                                    <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password"
                                        value={password}
                                        onChange={this.onFieldChange}
                                        className={pristine.password ? '' : (error.password ? 'is-invalid' : 'is-valid')} />
                                    <Form.Control.Feedback type="invalid">{error.password}</Form.Control.Feedback>
                                </Form.Group>
                                <span style={{display: 'block', color: 'red', fontSize: '14px', paddingBottom: '20px'}}>{mainError}</span>
                                <Button variant={this.isValid() ? 'primary': 'secondary'} type="submit" className="col-12 col-sm-5">Sign In</Button>

                            </Form>
                        </Col>
                    </Row>
                </Container>;

            </div>

        );
    }
}


export default withFirebase(Login);