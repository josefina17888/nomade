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
import Favorites from './components/Favorites/Favorites' 
//import Verify from './components/EmailVerify/Verify'
import Profile from './components/Profile/profile';
import GuestReview from './components/GuestReview/GuestReview'
import LodgingReview from './components/LodgingReview/LodgingReview'
/* import AdminDash from './components/Admin/AdminDash'; */
import Booking from './components/Booking/Booking'
import MercadoPago from './components/MercadoPago/MercadoPago'
import Chat from './components/Messenger/Chat/Chat'


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
          <Route path='/:guestId/form' component={FormHost}/>
          <Route exact path='/favorites' component={Favorites}/> 
          <Route exact path= '/booking/:_id' component={Booking}/>
          <Route path='/profile/:email' component={Profile}></Route>
          {/* <Route path='/:idGuest/verify/:token' component={Verify}/> */}
          <Route path='/:email/form' component={FormHost}/>
         {/*  <Route exact path='/admindashboard' component={AdminDash}/> */}
          <Route path='/guestreview/:hostId/:guestId' component={GuestReview}/>
          <Route path='/lodgingreview/:hostId/:lodgingId' component={LodgingReview}/>
          <Route path= "/mercadopago" component={MercadoPago}/>
          <Route path= '/chat' component={Chat}/>
        </Switch>
      </BrowserRouter>
   </div>
  );
}

export default App;
