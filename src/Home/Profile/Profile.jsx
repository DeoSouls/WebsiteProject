import React from 'react';
import { Route, Routes} from 'react-router';
import { Account } from './Account/Account'; 
import { Passwords } from './Passwords/Passwords';
import { Reviews } from './Reviews/Reviews';
import './Profile.css';

export const Profile = (props) => {

    var firstname = props.first || 'no';
    var lastname = props.last || 'user';

    return (
        <div>
            <div className='profile-name'>
                <div className='profile-indent'>
                    <h1 className='header-profile'>{firstname.substring(0,1).toLocaleUpperCase()}{firstname.substring(1,firstname.length)} {lastname.substring(0,1).toLocaleUpperCase()}{lastname.substring(1,lastname.length)}</h1>
                </div>
            </div>
            <div className='profile-nav'>
                <div className='profile-nav-container'>
                    <button className='profile-nav-btn'>
                        <div className='profile-nav-img'></div>
                        Profile
                    </button>
                </div>
            </div>
            <div className='nav-account'>
                <div className='between-nav'>
                    <div className='navigate-profile'>
                        <div className='secondary-options'>
                            <a style={{textDecoration: 'none'}} href="/profile/reviews"><p className='option-account'>Reviews</p></a>
                        </div>
                        <div className='account-options'>
                            <a style={{textDecoration: 'none'}} href="/profile/account"><p className='option-main'>Account</p></a>
                        </div>
                        <div className='account-options'>
                            <a style={{textDecoration: 'none'}} href="/profile/passwords"><p className='option-main'>Passwords</p></a>
                        </div>
                    </div>
                    <div className='profile-content'>
                        <Routes>
                            <Route path='account' element={<Account name={props}/>}></Route>
                            <Route path='passwords' element={<Passwords />}></Route>
                            <Route path='reviews' element={<Reviews />}></Route>
                        </Routes>
                    </div>
                </div>
                
            </div>
        </div>
    )
}