import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import '../../static/css/index.css'

import { ProSidebarProvider } from 'react-pro-sidebar';
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
  <div>
      <ProSidebarProvider>
      <div>
 
        <HomePage />
      </div>
      </ProSidebarProvider>

      </div>
 
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);

    
