import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



function showInvoice() {
  document.getElementById('hiddenContainer').style.display = 'flex';
}



const Invoice = props => (
  
  <tr>
    <td>{props.invoice.invoiceNum}</td>
    <td>{props.invoice.date.substring(0,10)}</td>
    <td>${props.invoice.amount}</td>
    <td>${props.invoice.balancedue}</td>
    <td>{props.invoice.customerName}</td>
    <td>{props.invoice.status}</td>
    <td>
     <a href="#" onClick={showInvoice}>Show</a> | <Link to={"/edit-invoice/"+props.invoice._id}>edit</Link> | <a href="#" onClick={() => { props.deleteInvoice(props.invoice._id) }}>delete</a>
    </td>
  </tr>
  )



const InvoicePopUp = props => (
  <div className="hiddenContainer" id="hiddenContainer">

    <label htmlFor="">Logged by:
    <p>{props.invoice.username}</p></label>

    <label htmlFor="">Invoice Num:
    <p>{props.invoice.invoiceNum}</p></label>

    <label htmlFor="">Date:
    <p>{props.invoice.date.substring(0,10)}</p></label>

    <label htmlFor="">Description:
    <p>{props.invoice.description}</p></label>

    <label htmlFor="">Amount:
    <p>${props.invoice.amount}</p></label>

    <label htmlFor="">Balance Due:
    <p>${props.invoice.balancedue}</p></label>

    <label htmlFor="">Customer:
    <p>{props.invoice.customerName}</p></label>

    <label htmlFor="">Status:
    <p>{props.invoice.status}</p></label>

    <label htmlFor="">Email:
    <p>{props.invoice.email}</p></label>

    <label htmlFor="">Address:
    <p>{props.invoice.address}</p></label>

    <label htmlFor="">Phone:
    <p>{props.invoice.phone}</p></label>

  </div>

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
    });
  }
  

  invoiceList() {
    return this.state.invoices.map(currentInvoice => {
      return <Invoice invoice={currentInvoice} deleteInvoice={this.deleteInvoice} key={currentInvoice._id}/>;
    });
  }

   invoiceHiddenContainer() {
    return this.state.invoices.map(currentInvoice => {
      return <InvoicePopUp invoice={currentInvoice} deleteInvoice={this.deleteInvoice} key={currentInvoice._id}/>;
    });
  }
  
  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Balance Due</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.invoiceList() }
          </tbody>
        </table>
        <div>{ this.invoiceHiddenContainer() }</div>
      </div>

    )
  }
}
