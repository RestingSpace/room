import React from 'react';
import './App.css';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';
import ReserveInfo from './pages/ReserveInfo';
import Login from './pages/Login';
import Register from './pages/Register'
import {Route, Switch} from "react-router-dom"; 

import Navbar from "./components/Navbar";
import CheckOut from "./pages/CheckOut"
import LogOut from"./pages/LogOut";

function App() {

  return (
    
  <>
    <Navbar />
    {console.log("jere")}
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/rooms/" component={Rooms} />
      <Route exact path="/rooms/:slug" component={SingleRoom} />
      <Route exact path="/reserve" component={ReserveInfo} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/checkout" component={CheckOut} />
      <Route exact path="/logout" component={LogOut} />
      <Route component={Error} />
    </Switch>
  </>
  );
}

export default App;
