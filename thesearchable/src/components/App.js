import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import '../../static/css/index.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { AuthProvider } from "../authentication/AuthContext";

import { ProSidebarProvider } from 'react-pro-sidebar';
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
 
  <div>
  
   
        <Router>
     
        <AuthProvider>
        <React.StrictMode>
      <ProSidebarProvider>
      <div>
        <HomePage />
      </div>
      </ProSidebarProvider>
      </React.StrictMode>
 
        </AuthProvider>
     
      </Router>
      
      </div>
  
 
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
