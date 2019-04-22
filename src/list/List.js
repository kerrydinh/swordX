import React, { Component } from 'react';
import { loadItems, updateItems } from '../redux/action';
import { connect } from 'react-redux';
import { getListItem, getChangedListItem } from '../redux/selector';
import { withFirebase } from '../firebase';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import sampleSize from 'lodash/sampleSize';
import random from 'lodash/random';
import sumBy from 'lodash/sumBy';
import './list.css';

class List extends Component {
    state = {}

    componentDidMount() {
        this.props.loadItems(this.props.firebase);
        this.interval = setInterval(() => {
            var items = sampleSize(this.props.listItem, random(10, 15))
            items.forEach(element => {
                element.budget = element.budget + random(-1000, 1000);
            });
            this.props.updateItems(this.props.firebase, items);
        }, random(3000, 8000));
    }
    render() {
        return (<div>

            <Container>
                <Row className="justify-content-md-center">
                    <Col md="10" style={{ padding: '30px 20px 30px 20px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '20px', background: "#fff" }}>
                        <h1>Bank customer</h1>
                        <h2>Total: {sumBy(this.props.listItem, "budget")} $</h2>
                        <div class="table-bank">
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Age</th>
                                        <th>Married</th>
                                        <th>Budget ($)</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {this.props.listItem.map((item, index) =>
                                        <tr key={index.toString()} className={this.props.changingListItems.includes(item.index) ? "value-changer" : ""}>
                                            <td>{item.index}</td>
                                            <td>{item.fullname}</td>
                                            <td>{item.email}</td>
                                            <td>{item.age}</td>
                                            <td>{item.married ? 'YES' : 'NO'}</td>
                                            <td>{item.budget}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>

                    </Col>
                </Row>
            </Container>;


        </div>);
    }
}

const mapStatetoProps = state => {
    const listItem = getListItem(state);
    const changingListItems = getChangedListItem(state);
    return {
        listItem: listItem,
        changingListItems: changingListItems
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadItems: (firebaseService) => dispatch(loadItems(firebaseService)),
        updateItems: (firebaseService, item) => dispatch(updateItems(firebaseService, item))
    }
}

export default connect(
    mapStatetoProps,
    mapDispatchToProps
)(withFirebase(List));