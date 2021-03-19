import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default class CreateInvoice extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeBalanceDue = this.onChangeBalanceDue.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeCustomerName = this.onChangeCustomerName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeInvoiceNum = this.onChangeInvoiceNum.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      amount: 0,
      date: new Date(),
      users: [],
      status: '',
      balancedue: '',
      customerName: '',
      phone: '',
      email: '',
      address: '',
      invoiceNum: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    })
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    })
  }
  onChangeBalanceDue(e) {
    this.setState({
      balancedue: e.target.value
    })
  }
  onChangeCustomerName(e) {
    this.setState({
      customerName: e.target.value
    })
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }
  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    })
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    })
  }
  onChangeInvoiceNum(e) {
    this.setState({
      invoiceNum: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();

    const invoice = {
      username: this.state.username,
      description: this.state.description,
      amount: this.state.amount,
      date: this.state.date,
      status: this.state.status,
      balancedue: this.state.balancedue,
      customerName: this.state.customerName,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address,
     invoiceNum: this.state.invoiceNum
    }

    console.log(invoice);

    axios.post('http://localhost:5000/invoices/add', invoice)
      .then(res => console.log(res.data));

    window.location = '/';
  }



  render() {
    return (
    <div className="create-container">
      <h3>New Invoice</h3>
      <form onSubmit={this.onSubmit} className="invoice-form">
      <button className="form-buttons" type="submit" value="Cancel">
        <Link to="/invoice-list">
        <FontAwesomeIcon icon={faTimes} size="3x" id="create-exit-icon"/>
        </Link></button>
        <div className="top-form"> 
          <label>Username: 
          <input ref={this.state.username}
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername} 
              readOnly>
          </input></label>
          <label>Invoice #: 
          <input 
              type="text" 
              className="form-control"
              value={this.state.invoiceNum}
              onChange={this.onChangeInvoiceNum}
              /></label>
              <label>Date: 
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </label>
          <label>Amount: 
          <input 
              type="text" 
              className="form-control"
              value={this.state.amount}
              onChange={this.onChangeAmount}
              /></label>
              <label>Due: 
          <input 
              type="text" 
              className="form-control"
              value={this.state.balancedue}
              onChange={this.onChangeBalanceDue}
              /></label>
          <label>Status: 
          <input 
              type="text" 
              className="form-control"
              value={this.state.status}
              onChange={this.onChangeStatus}
              /></label>
        </div>
        <div className="bottom-form">
          <label>Customer: 
          <input 
              type="text" 
              className="form-control"
              value={this.state.customerName}
              onChange={this.onChangeCustomerName}
              /></label>
          <label>Phone: 
          <input 
              type="text" 
              className="form-control"
              value={this.state.phone}
              onChange={this.onChangePhone}
              /></label>
          <label>Email: 
          <input 
              type="text" 
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            /></label>
          <label>Address: 
          <input 
              type="text" 
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
              /></label>
        </div>
        <label>Description:
        <textarea  type="textarea" 
        cols="100" rows="10"
              required
              className="textarea"
              value={this.state.description}
              onChange={this.onChangeDescription}
              /></label>
        <div className="form-btn-container">
          <button className="form-buttons" type="submit" value="Create Invoice">Create Invoice</button>
          <button className="form-buttons" type="submit" value="Cancel"><Link to="/invoice-list">Cancel</Link></button>
        </div>
      </form>
    </div>
    )
  }
}