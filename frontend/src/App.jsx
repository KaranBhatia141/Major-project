import React, { Fragment } from 'react'
import { Route, Routes,Outlet } from 'react-router-dom'
import Auth from './pages/Register/Register'
import Home from './pages/Home/Home'
import Login from './pages/Login/login'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { QueryClient,QueryClientProvider,} from "@tanstack/react-query";
import "./App.scss";
import Gig from './pages/Gig/Gig'
import Add from './pages/Add/Add'
import Gigs from './pages/Gigs/Gigs'
import MyGigs from './pages/myGigs/MyGigs'
import Orders from './pages/orders/Order/Order'
// import Message from './pages/Message/Message'
import Messages from './pages/Messages/Messages/Messages'
import Board from './components/Board/Board'
import Payment from './pages/Payment/PaymentPage'

const stripePromise = loadStripe('pk_test_51RMUDwDC8InRMuavwKYj5rOY9rLXMDoJXdR916M5Ii4ogC7Mrd41kJm3WHPjBvTuhls2cy1VdLVKC4y1FP5JR8x600RihLfcDZ')
export default function App() {

  const queryClient = new QueryClient();
  return (
    <div className='app'>
           
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet/>
     
       


    <Fragment>
         <Elements stripe={stripePromise}>
        <Routes>
         <Route element={<Home />}  path='/'/>

         <Route element={<Login />} path='/login'/>
         <Route element={<Auth signup/>} path='/register'/>
         <Route element={<Gig />} path='/gig/:id'/>
         <Route element={<Add />} path='/add'/>
         <Route element={<Gigs />} path='/gigs'/>
         <Route element={<MyGigs />} path='/myGigs'/>
         <Route element={<Orders />} path='/orders'/>
         {/* <Route element={<Message />} path='/message'/> */}
         {/* <Route element={<Messages />} path='/messages'/> */}
         <Route element={<Messages />} path='/messages'/>
         <Route element={<Board />} path='/board'/>
           <Route element={<Payment />} path='/payments'/>
          
          
       </Routes>
         </Elements>
    </Fragment>
          <Footer />
        </QueryClientProvider>
      
    </div>
  )
}

