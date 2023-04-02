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
import Faq from './components/FAQ/Faq'
import PostProduct from './components/PostProduct/PostProduct';
import Categories from './components/Categories/Categories'
import SellBox from './components/SellBox/SellBox'
import Favorites from './components/Favorites/Favorites'
import { MpProvider } from './contexts/mpContext'
import { CartProvider } from './contexts/CartContext'

function App() {
  return (
    <>
    <CartProvider>
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
              <Route exact path='/search' element={<Categories />} />
              <Route exact path='/faq' element={<Faq />} />
              <Route exact path="/postProduct" element={<PostProduct />} />
              <Route exact path="/product/" element={<SellBox />} />
              <Route exact path='/me/:id/favorites' element={<Favorites />} /> 
              
            </Routes>

            
            <MobileMenu />
          </div>
        </BrowserRouter>
      </MpProvider>
      </CartProvider>
    </>
  );
}

export default App;
