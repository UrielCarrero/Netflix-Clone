import React from 'react'
import '../Styles/Footer.css'

export const Footer = ():JSX.Element => {
    return(<>
        <div className='footer__container'>
            <div className='col-12 number__footer'>
            Questions? Call <span> 01 800 917 1563</span>
            </div>
            <div className='footer__columns'>
                <div className='footer__column'>
                    <p>FAQ</p>
                    <p>Investor Relations</p>
                    <p>Ways to Watch</p>
                    <p>Corporate Information</p>
                    <p>Only on Netflix</p>
                    
                    <br/>
                    <span className='selectlang__navfooter'>
                        <i className="ri-global-fill"></i>  
                        <select>
                        <option className='lang_option' value="English">English</option>
                        
                        </select>
                    </span>
                    <p className='brand__footer'>Netflix Colombia</p>
                </div>
                <div className='footer__column'>
                    <p>Help Center</p>
                    <p>Jobs</p>
                    <p>Terms of Use</p>
                    <p>Contact Us</p>
                </div>
                <div className='footer__column'>
                    <p>Account</p>
                    <p>Redeem Gift Cards</p>
                    <p>Privacy</p>
                    <p>Speed Test</p>
                </div>
                <div className='footer__column'>
                    <p>Media Center</p>
                    <p>Buy Gift Cards</p>
                    <p>Cookie Preferences</p>
                    <p>Legal Notices</p>
                </div>
            </div>
           
        </div>
    </>)
}