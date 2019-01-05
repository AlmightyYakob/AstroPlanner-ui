import React, { Component } from 'react';
import Calendar from './Calender';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main">
          <Calendar />
        </div>
      </div>
    );
  }
}

export default App;
