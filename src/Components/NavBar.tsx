import React from 'react';
import Netflixlogo from '../Assets/Netflix_logo.png'
import {Navbar, NavbarBrand, NavbarText, Nav, NavItem, NavLink} from 'reactstrap';
import '../Styles/NavBar.css'


interface INavBar {
    hide:boolean;
    logout:()=>void;
}

 export const NavBar = ({hide, logout}:INavBar):JSX.Element => {

    const component = 
    
    <>
    <div className='navbarmain__container'>
        <div className='left__container'>
        <NavbarBrand href="/">      
            <img className='mainlogo__nav' alt="netflix_logo" src={Netflixlogo} />
        </NavbarBrand>       


            <div className='nav__medium'>
                <Nav >
                    <NavItem >
                    <NavLink className='nav__item' href="/browse">
                        <div className='navlink'>Inicio</div>
                    </NavLink>
                    
                    </NavItem>
                    <NavItem>
                    <NavLink href="/series">
                        <div className='navlink'>Series</div>
                        
                    </NavLink>
                    
                    </NavItem>
                    <NavItem>
                    <NavLink href="/">
                        <div className='navlink'>Peliculas</div>
                    </NavLink>
                    
                    </NavItem>
                    <NavItem>
                    <NavLink href="/lastest">
                        <div className='navlink'>Novedades populares</div>
                    </NavLink>
                    
                    </NavItem>
                    <NavItem>
                    <NavLink href="/mylist">
                        <div className='navlink'>Mi lista</div>
                    </NavLink>
                    
                    </NavItem>
                    <NavItem>
                    <NavLink href="/">
                        <div className='navlink'>Explorar por idiomas</div>
                    </NavLink>
                    
                    </NavItem>
                </Nav>
            </div>
        </div>

            
        <div className='navbar__text'>
            <span className='navbartext__icon'><i className="ri-search-line"></i></span>
            <span>{"Niños "}</span>
            <span className='navbartext__icon'><i className="ri-notification-3-line"></i></span>
            <span className='profile__container'>
                <span className='profile__picture'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" />
                    <i className="ri-arrow-down-s-fill"></i>
                </span>
                <div className='navprofile__menu'>
                    <div className='menuarrow__container'>
                        <i className="navprofile__menuarrow ri-arrow-up-s-fill"></i>
                    </div>
                    <div>
                        <div>
                            <i className="ri-pencil-line"></i>
                            <span>Administrar Perfiles</span>
                        </div>
                        <div>
                            <i className="ri-user-line"></i>
                            <span>Cuenta</span>
                        </div>
                        <div>
                            <i className="ri-information-line"></i>
                            <span>Centro de Ayuda</span>
                        </div>
                    </div>
                    <div onClick={()=>{logout()}} className='nav__logout'>
                        Cerrar Sesion
                    </div>
                </div>
            </span>
        </div>

    </div>
    </>

    return(<>
        {hide?<></>:
        component}
    </>)
 }