import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//components
import Nav from "./components/nav"
import InvoiceList from "./components/invoice-list";
import EditInvoice from "./components/edit-invoice";
import CreateInvoice from "./components/create-invoice";
import CreateUser from "./components/create-user";
import Login from './components/Login';
import AuthContext from "./context/AuthContext";

// images
import Skynet from './skynet.jpg';



function Router() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/">
          <div className="homescreen">
          <img src={Skynet} alt=""/>
          <h3>Welcome to Skynet<br />Work Flow</h3>
          </div>
        </Route>
        {loggedIn === false && (
          <>
            <Route path="/Login">
              <Login />
            </Route>
          </>
        )}
        {loggedIn === true && (
          <>
            <Route path="/create-invoice">
              <CreateInvoice />
            </Route>
            <Route path="/edit-invoice">
              <EditInvoice />
            </Route>
            <Route path="/create-user">
              <CreateUser />
            </Route>
            <InvoiceList />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;