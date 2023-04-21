import React from 'react';
import { Catalog } from '../Catalog/Catalog';
import { Route, Routes, useNavigate} from 'react-router';
import { Account } from './Account/Account'; 
import './Profile.css';



export const Profile = (props) => {

    var firstname = props.first;
    var lastname = props.last;

    return (
        <div>
            <div className='profile-name'>
                <div className='profile-indent'>
                    <h1 className='header-profile'>{firstname.substring(0,1).toLocaleUpperCase()}{firstname.substring(1,firstname.length)} {lastname.substring(0,1).toLocaleUpperCase()}{lastname.substring(1,lastname.length)}</h1>
                </div>
            </div>
            <div className='profile-nav'>
                <button className='profile-nav-btn'>
                    <div className='profile-nav-img'></div>
                    Profile
                </button>
            </div>
            <div className='nav-account'>
                <div className='navigate-profile'>
                    <div className='secondary-options'>
                        <a style={{textDecoration: 'none'}} href="/profile/catalog"><p className='option-account'>Orders</p></a>
                        <a style={{textDecoration: 'none'}} href="/"><p className='option-account'>Subscriptions</p></a>
                        <a style={{textDecoration: 'none'}} href="/"><p className='option-account'>Test Results</p></a>
                        <a style={{textDecoration: 'none'}} href="/"><p className='option-account'>Sessions</p></a>
                        <a style={{textDecoration: 'none'}} href="/"><p className='option-account'>Recommendations</p></a>
                        <a style={{textDecoration: 'none'}} href="/"><p className='option-account'>Rewards</p></a>
                        <a style={{textDecoration: 'none'}} href="/"><p className='option-account'>Reviews</p></a>
                    </div>
                    <div className='account-options'>
                        <a style={{textDecoration: 'none'}} href="/profile/account"><p className='option-main'>Account</p></a>
                        <a style={{textDecoration: 'none'}} href="/"><p className='option-main'>Health Profile</p></a>
                        <a style={{textDecoration: 'none'}} href="/"><p className='option-main'>Passwords</p></a>
                        <a style={{textDecoration: 'none'}} href="/"><p className='option-main'>Shipping Address</p></a>
                        <a style={{textDecoration: 'none'}} href="/"><p className='option-main'>Payment Method</p></a>
                        <a style={{textDecoration: 'none'}} href="/"><p className='option-main'>Communications</p></a>
                    </div>
                    <div className='contact-options'>
                        <a style={{textDecoration: 'none'}} href="/"><p className='option-contact'>Contact Us</p></a>
                    </div>
                </div>
                <div className='profile-content'>
                    <Routes>
                        <Route path='account' element={<Account name={props}/>}></Route>
                    </Routes>
                </div>
            </div>

            
        </div>
    )
}