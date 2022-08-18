import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom'; 
import GoogleMaps from './components/GoogleMaps/GoogleMaps';
import Home from './components/Home/Home';
import FormUser from './components/FormUser/FormUser';

function App() {
  return (
   <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/map" component={GoogleMaps} />
          <Route path="/login" component={FormUser} />
        </Switch>
      </BrowserRouter>
   </div>
  );
}

export default App;
