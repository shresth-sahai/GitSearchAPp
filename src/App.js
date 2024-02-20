import React from "react";
import logo from "./logo.jpg";
import "./App.css";

import Pages from "./Pages";
import { BrowserRouter as Router  } from "react-router-dom";

function App() {
  return (
    <>
    <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
    
    <Pages/>
    </Router>
    </>
  );
}

export default App;
