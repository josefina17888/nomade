import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom'; 
import GoogleMaps from './components/GoogleMaps/GoogleMaps.js';
import Home from './components/Home/Home.js';
import LoginUser from './components/LoginUser/LoginUser.js';
import FormUser from './components/FormGuest/FormGuest.js';
import CardDetail from './components/CardDetail/CardDetail';
import FormLodging from './components/FormLodging/FormLodging.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormHost from './components/FormHost/FormHost'
import Booking from './components/Booking/Booking'
//import Verify from './components/EmailVerify/Verify'
import Profile from './components/Profile/profile';
import GuestReview from './components/GuestReview/GuestReview'
import LodgingReview from './components/LodgingReview/LodgingReview'


function App() {
  return (
   <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/map" component={GoogleMaps} />
          <Route path="/login" component={LoginUser} />
          <Route exact path= '/:hostId/registerlodging' component={FormLodging}/>
          <Route path="/registerguest" component={FormUser} />
          <Route exact path= '/detail/:_id' component={CardDetail}/>
          <Route exact path= '/:_id' component={Booking}/>
          <Route path='/profile/:email' component={Profile}></Route>
          {/* <Route path='/:idGuest/verify/:token' component={Verify}/> */}
          <Route path='/:email/form' component={FormHost}/>
          <Route path='/guestreview/:hostId/:guestId' component={GuestReview}/>
          <Route path='/lodgingreview/:hostId/:lodgingId' component={LodgingReview}/>
        </Switch>
      </BrowserRouter>
   </div>
  );
}

export default App;
