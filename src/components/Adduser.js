import React, { Component } from "react";
import { Modal, Button, FormControl } from "react-bootstrap";

class Adduser extends Component {
  state = {
    name: "",
    firstName: "",
    mail: "",
    phoneNumber: ""
  };
  componentDidMount() {
    this.props.isEdit
      ? this.setState({
          name: this.props.user.name,
          firstName: this.props.user.firstName,
          phoneNumber: this.props.user.phoneNumber,
          mail: this.props.user.mail,
          id: this.props.user._id
        })
      : this.setState({
          name: "",
          firstName: "",
          mail: "",
          phoneNumber: ""
        });
  }
  changeHandler = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    console.log("this.props.isEdit", this.props.isEdit);
    const { show, handleShow, handleAdd } = this.props;
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          {" "}
          Add User{" "}
        </Button>
        <Modal show={show} onHide={handleShow} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.isEdit ? "Edit User" : "ADD User"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              type="text"
              name="name"
              defaultValue={this.state.name}
              placeholder="Please write a name...."
              onChange={this.changeHandler}
            />
            <FormControl
              type="text"
              defaultValue={this.state.firstName}
              name="firstName"
              placeholder="Please write a first name...."
              onChange={this.changeHandler}
            />
            <FormControl
              type="text"
              name="mail"
              defaultValue={this.state.mail}
              placeholder="Please write an mail...."
              onChange={this.changeHandler}
            />
            <FormControl
              type="text"
              name="phoneNumber"
              defaultValue={this.state.phoneNumber}
              placeholder="Please write a phone number...."
              onChange={this.changeHandler}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow}>
              {" "}
              Close{" "}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleAdd(this.state);
                handleShow();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Adduser;
