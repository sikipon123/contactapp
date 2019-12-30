import React, { Component } from "react";
import { Col, Button, Row } from "react-bootstrap";
import Adduser from "./Adduser"
import "./user.css";

class Users extends Component {
  state = {
    show: false
  };
  handleShow = () => this.setState({ show: !this.state.show });
  render() {
    const { _id, name, firstName, mail, phoneNumber } = this.props.user;
    return (
      <Col>
        <Row>
          <span>{name}</span>
          <span>{firstName}</span>
        </Row>
        <Row>
          <span role="img" area-label="mail">
            📧
          </span>
          <span>{mail}</span>
        </Row>
        <Row>
          <span role="img" area-label="mail">
            📱
          </span>
          <span>{phoneNumber}</span>
        </Row>
        <Row>

          <Button
            variant="primary"
            className="ml-auto btn"
            onClick={this.handleShow}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="mr-auto btn"
            onClick={() => this.props.deleteUser(_id)}
          >
            {" "}
            Delete{" "}
          </Button>
        </Row>
        {this.state.show ? (
          <Adduser
            show={this.state.show}
            handleShow={this.handleShow}
            handleAdd={this.props.handleAdd}
            isEdit={true}
            user={this.props.user}
          />
        ) : null}
      </Col>
    );
  }
}
export default Users;

//ctrl+alt+l ==> TCL