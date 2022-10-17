import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Signup from './components/Signup/Signup'
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import Settings from './components/Settings/Settings'
import MobileMenu  from './components/MobileMenu/MobileMenu';
import SuccessfullBinding from './components/mpSuccesfullBinding/successfullBinding';
import { MpProvider } from './contexts/mpContext'

function App() {
  return (
    <>

      <MpProvider >
        <BrowserRouter>
          <div className="main">
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/me/:id' element={<Profile />} />
              <Route exact path='/me/:id/settings' element={<Settings />} />
              <Route exact path='/successfullBinding' element={<SuccessfullBinding />} />
            </Routes>

            
            <MobileMenu />
          </div>
        </BrowserRouter>
      </MpProvider>
    </>
  );
}

export default App;
