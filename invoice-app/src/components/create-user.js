import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      passwordConfirm: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  onChangePasswordConfirm(e) {
    this.setState({
      passwordConfirm: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: '',
      password: '',
      passwordConfirm: ''
    })
  }

  render() {
    return (
      <div className="create-user">
        <h3>New User</h3>
        <form onSubmit={this.onSubmit} className="user-form">
            <label>Username: 
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                /></label>
                <label>Password: 
                <input  type="password"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                /> </label>
                <label>Confirm Password: 
                <input  type="password"
                required
                className="form-control"
                value={this.state.passwordConfirm}
                onChange={this.onChangePasswordConfirm}
                /></label>
          <div className="form-group">
          <div className="form-btn-container">
          <button className="form-buttons" type="submit" value="Create User">Create User</button>
          <button className="form-buttons" type="submit" value="Cancel"><Link to="/invoice-list">Cancel</Link></button>
        </div>
          </div>
        </form>
      </div>
    )
  }
}