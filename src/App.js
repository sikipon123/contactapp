import React from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import Users from './components/Users';
import Adduser from './components/Adduser';

class App extends React.Component {
  state = { users: [], show: false};

  handleShow = () => this.setState({ show: !this.state.show });

  getAllusers = () =>
    axios.get('/users').then(response =>
      this.setState({
        users: response.data
      })
    );

  handleDelete = id =>
    axios.delete(`deleteuser/${id}`).then(this.getAllusers());

  handleAdd = newUser =>
    axios.post('/newUser', newUser).then(this.getAllusers());
  handleEdit = editedUser => {
    axios
      .put(`/editedUser/${editedUser.id}`, {
        name: editedUser.name,
        firstName: editedUser.firstName,
        phoneNumber: editedUser.phoneNumber,
        mail: editedUser.mail
      })
      .then(this.getAllusers());
  };
  componentDidMount() {
    this.getAllusers();
  }
  render() {
    return (
      <Container>
        {this.state.users.map((user, key) => (
          <Row className='mt-3'>
            <Users
              user={user}
              key={key}
              deleteUser={this.handleDelete}
              handleAdd={this.handleEdit}
            />
          </Row>
        ))}
        <Row>
          <Adduser
            show={this.state.show}
            handleShow={this.handleShow}
            handleAdd={this.handleAdd}
          />
        </Row>
      </Container>
    );
  }
}

export default App;