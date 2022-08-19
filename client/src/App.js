import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom'; 
import GoogleMaps from './components/GoogleMaps/GoogleMaps.js';
import Home from './components/Home/Home.js';
import FormUser from './components/FormGuest/FormGuest.js';
import FormHost from './components/FormHost/FormHost.js'

function App() {
  return (
   <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/map" component={GoogleMaps} />
          <Route path="/login" component={FormUser} />
          <Route path="/host" component ={FormHost} />
        </Switch>
      </BrowserRouter>
   </div>
  );
}

export default App;
