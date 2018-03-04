import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import restaurant from './reduc.json';
var hello = "hello world!";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Eat good Pay less</h1>
        </header>
        <p className="App-intro"alt="logo">
        <img src={logo} className="App-logo"  />

        </p>
    <div>
{
  restaurant.map(function(restau){
if(restau.promo == "")
{
  return <li> {restau.name}  - Event : {restau.event} </li>;

}
if(restau.event == "")
{
   return <li> {restau.name}  - Promo : {restau.promo} </li>;

}
else
{
  return <li> {restau.name}  - Promo : {restau.promo} - Event : {restau.event}  </li>;

}
  })

}

    </div>

      </div>


    );
  }
}

export default App;
