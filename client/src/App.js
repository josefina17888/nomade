import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch, Router } from 'react-router-dom'; 
import GoogleMaps from './components/GoogleMaps/GoogleMaps.js';
import Home from './components/Home/Home.js';
import LoginUser from './components/LoginUser/LoginUser.jsx';
import FormUser from './components/FormGuest/FormGuest.js';
import CardDetail from './components/CardDetail/CardDetail';
import FormLodging from './components/FormLodging/FormLodging.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormHost from './components/FormHost/FormHost'
import Verify from './components/EmailVerify/Verify'
import ResetPassword from './components/EmailVerify/ResetPassword'
import ForgotPassword from './components/EmailVerify/ForgotPassword'
import Favorites from './components/Favorites/Favorites' 
import Profile from './components/Profile/profile';
import GuestReview from './components/GuestReview/GuestReview'
import LodgingReview from './components/LodgingReview/LodgingReview'
import ResetPasswordLogIn from "./components/EmailVerify/ResetPasswordLogIn"
/* import AdminDash from './components/Admin/AdminDash'; */
import Booking from './components/Booking/Booking'
import Status from './components/MercadoPago/Status';
import Chat from './components/Messenger/Chat/Chat'
import complaint from './components/complaint/complaint'
import { useSelector } from 'react-redux';

function App() {
  /* const user = useSelector(state=> state.demoUser) */
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
          <Route path='/:idGuest/verify/:token' component={Verify}/>
          <Route exact path='/favorites' component={Favorites}/> 
          <Route path='/profile/:email' component={Profile}></Route>
          {/* <Route path='/:idGuest/verify/:token' component={Verify}/> */}
          <Route path='/:email/form' component={FormHost}/>
         {/*  <Route exact path='/admindashboard' component={AdminDash}/> */}
          <Route path='/lodgingreview/:hostId/:lodgingId' component={LodgingReview}/>
          <Route exact path='/booking/:_id' component={Booking}/> 
          {/* <Route exact path='/booking/:_id'>  {user ? <LoginUser /> : <Booking />} </Route> */}
          <Route path='/guestreview/:hostId/:guestId' component={GuestReview}/>
          <Route exact path='/lodgingreview/:hostId/:lodgingId' component={LodgingReview}/>
          <Route path='/:idGuest/resetPassword/:token' component={ResetPassword}/>
          <Route path='/:email/resetPassword' component={ResetPasswordLogIn}/>
          <Route path='/forgot-password/' component={ForgotPassword}/>
          {/* <Route path= "/mercadopago" component={MercadoPago}/> */}
          <Route exact path= '/complaint/:guestId/:lodgingId' component={complaint}/>
          <Route path= "/status" component={Status}/>
          <Route path= '/chat' component={Chat}/>
          
        </Switch>
      </BrowserRouter>
   </div>
  );
}

export default App;
