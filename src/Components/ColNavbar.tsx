import React from 'react'
import { Link } from 'react-router-dom';
import {Navbar, NavbarBrand, NavbarText} from 'reactstrap';
import '../Styles/ColNavbar.css'
import Netflixlogo from '../Assets/Netflix_logo.png'

export const ColNavbar = ():JSX.Element => {
    return(<>
    
    <Navbar dark={false}>
            <NavbarBrand href="/">      
            <img className='logo__nav' alt="netflix_logo" src={Netflixlogo} />
            </NavbarBrand>       


            {/*<div className='nav__medium'>
                <Nav >
                    <NavItem >
                    <NavLink className='nav__item' href="/home">
                        <div className='navlink'>Home</div>
                    </NavLink>
                    <div className='under__line'></div>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/men">
                        <div className='navlink'>Men</div>
                        
                    </NavLink>
                    <div className='under__line'></div>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/women">
                        <div className='navlink'>Women</div>
                    </NavLink>
                    <div className='under__line'></div>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/accessories">
                        <div className='navlink'>Accessories</div>
                    </NavLink>
                    <div className='under__line'></div>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/electronics">
                        <div className='navlink'>Electronics</div>
                    </NavLink>
                    <div className='under__line'></div>
                    </NavItem>
                </Nav>
            </div>*/}
            
            <NavbarText>
                <div className="right__text">
                    <span className='selectlang__nav'>
                        <i className="ri-global-fill"></i>
                        <select>
                        <option className='lang_option' value="English">English</option>
                        
                        </select>
                    </span>

                    <button className='red__button' type="button"> <Link to='/login'> Sign In</Link></button>
                </div>

            </NavbarText>

    </Navbar>
    </>)
}