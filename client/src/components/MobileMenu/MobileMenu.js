import React from 'react'
import '../MobileMenu/MobileMenu.css'
import { NavLink } from 'react-router-dom'
import { AiOutlineHome, AiOutlineSearch, AiOutlineQuestionCircle, AiOutlineUser, AiFillPlusCircle } from 'react-icons/ai'

const MobileMenu = () => {

   const id = localStorage.getItem('id')
   return (
      <div className='mobile-menu-container'>

         <div className='mobile_menu_option'>
            <NavLink  className={({isActive}) => isActive ? 'styleNavLink' : undefined } to={'/'}>
             <AiOutlineHome size={25} />
               Home
            </NavLink> 
         </div>


         <div className='mobile_menu_option'>
            
            <NavLink className={({isActive}) => isActive ? 'styleNavLink' : undefined }  to={'/search'} end>
            <AiOutlineSearch size={25} />
               Buscar
            </NavLink>
         </div>

         <div className='mobile_menu_option'>
            
            <NavLink className={({isActive}) => isActive ? 'styleNavLink' : undefined }  to={'/postProduct'} end >
            <AiFillPlusCircle  size={35} />
               
            </NavLink>
         </div>


         <div className='mobile_menu_option'>
            
            <NavLink className={({isActive}) => isActive ? 'styleNavLink' : undefined }  to={'/faq'} end>
            <AiOutlineQuestionCircle size={25} />
              FAQ
            </NavLink>
         </div>

         <div className='mobile_menu_option'>
            
            <NavLink className={({isActive}) => isActive ? 'styleNavLink' : undefined } to={id ? `/me/${localStorage.getItem('id')}` : '/'} end>
            <AiOutlineUser size={25} />
               Perfil
            </NavLink>
         </div>



      </div>
   )
}

export default MobileMenu;