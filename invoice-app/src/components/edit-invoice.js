import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class Editinvoice extends Component {
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
      balancedue: 0,
      customername: '',
      phone: 0,
      email: '',
      address: '',
      invoiceNum: 0
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/invoices/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          amount: response.data.amount,
          date: new Date(response.data.date),
          status: response.data.status,
          balancedue: response.data.balancedue,
          customerName: response.data.customerName,
          phone: response.data.phone,
          email: response.data.email,
          address: response.data.address,
          invoiceNum: response.data.invoiceNum
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
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

  onChangeDate(date) {
    this.setState({
      date: date
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
      customername: this.state.customername,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address,
      invoiceNum: this.state.invoiceNum
    }

    console.log(invoice);

    axios.post('http://localhost:5000/invoices/update/' + this.props.match.params.id, invoice)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Invoice Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <input ref={this.state.username}
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername} 
              readOnly>
          </input>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>amount: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.amount}
              onChange={this.onChangeAmount}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <div className="form-group">
          <label>Status: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.status}
              onChange={this.onChangeStatus}
              />
        </div>
        <div className="form-group">
          <label>Balance Due: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.balancedue}
              onChange={this.onChangeBalanceDue}
              />
        </div>
        <div className="form-group">
          <label>Customer: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.customerName}
              onChange={this.onChangeCustomerName}
              />
        </div>
        <div className="form-group">
          <label>Phone: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.phone}
              onChange={this.onChangePhone}
              />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
        </div>
        <div className="form-group">
          <label>Invoice Number: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.invoiceNum}
              onChange={this.onChangeInvoiceNum}
              />
        </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Invoice Log" />
        </div>
      </form>
    </div>
    )
  }
}