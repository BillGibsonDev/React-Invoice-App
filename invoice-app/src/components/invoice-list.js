import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Invoice = props => (
  <tr>
    <td>{props.invoice.username}</td>
    <td>{props.invoice.invoiceNum}</td>
    <td>{props.invoice.date.substring(0,10)}</td>
    <td>{props.invoice.description}</td>
    <td>{props.invoice.amount}</td>
    <td>{props.invoice.balancedue}</td>
    <td>{props.invoice.customerName}</td>
    <td>{props.invoice.status}</td>
    <td>{props.invoice.email}</td>
    <td>{props.invoice.address}</td>
    <td>{props.invoice.phone}</td>
    <td>
      <Link to={"/edit/"+props.invoice._id}>edit</Link> | <a href="#" onClick={() => { props.deleteInvoice(props.invoice._id) }}>delete</a>
    </td>
  </tr>
)

export default class InvoicesList extends Component {
  constructor(props) {
    super(props);

    this.deleteInvoice = this.deleteInvoice.bind(this)

    this.state = {invoices: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/invoices/')
      .then(response => {
        this.setState({ invoices: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteInvoice(id) {
    axios.delete('http://localhost:5000/invoices/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      invoices: this.state.invoices.filter(element => element._id !== id)
    })
  }

  invoiceList() {
    return this.state.invoices.map(currentInvoice => {
      return <Invoice invoice={currentInvoice} deleteInvoice={this.deleteInvoice} key={currentInvoice._id}/>;
    })
  }

  render() {
    return (
      <div>
        
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Invoice Number</th>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Balance Due</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            { this.invoiceList() }
          </tbody>
        </table>
      </div>
    )
  }
}