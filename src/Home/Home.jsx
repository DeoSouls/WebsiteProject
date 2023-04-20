import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import { Route, Routes, useNavigate} from 'react-router';
import { Profile } from './Profile/Profile';
import { Catalog } from './Catalog/Catalog';
import { RootState } from '../slice/store';
import { useAppDispatch, useAppSelector } from '../slice/hook/redux'
import { fetchUsers } from '../slice/usersSlice';
import { Main } from '../Main/Main';
import './Home.css';

export const Home = (props) => {

    const [isSearch, setIsSearch] = useState(false);
    const [selectMenu, openSelectMenu] = useState(false);
    const navigation = useNavigate();
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.users);

    var isActivate = false;

    useEffect(() => {
        dispatch(fetchUsers());
    },[])


    const search = (
        <div className='search'>
            <div className='searching-img'></div>
            <input className='search-input' type="text" onBlur={hideSearch} placeholder='Search'/>
        </div>
    )

    function showSearch() {
        setIsSearch(true);
    }

    function hideSearch() {
        setIsSearch(false);
    }

    function signout() {
        localStorage.removeItem('isActivate');
        localStorage.removeItem('file');
        localStorage.removeItem('email');
        localStorage.removeItem('lastname');
        localStorage.removeItem('firstname');

        navigation('/authorization');
    }

    if(Object.keys(token.userData).length !== 0) {

        console.log(token);
        var active = localStorage.getItem('isActivate');
        console.log(active);
        if(token.userData.isActivate) {
            if(!active) {
                localStorage.setItem('isActivate', token.userData.isActivate);
                localStorage.setItem('firstname', token.userData.firstname);
                localStorage.setItem('lastname', token.userData.lastname);
            }
        }
    }

    if(Object.keys(token.error).length !== 0 & Object.keys(token.userData).length === 0){
        console.log(token);
        localStorage.removeItem('isActivate');
    }

    isActivate = localStorage.getItem('isActivate');
    var firstname = localStorage.getItem('firstname');
    var lastname = localStorage.getItem('lastname');
    
    return (
        <div>
            <div className='nav-bar'>
                <div className='nav-bar-btns'>
                    <a href='/' > 
                        <div className='logo'></div>
                    </a>
                    <a href='/catalog'>
                        <button className='nav-getstarted'>Начать</button>
                    </a>
                    <a href='/catalog'>
                        <button className='nav-getstarted'>Магазин</button>
                    </a>
                    <a href='/catalog'>
                        <button className='nav-getstarted'>Помощь</button>
                    </a>
                    <div className='nav-bar-other'>
                        {isSearch? search : <button onClick={showSearch} className='search-img'></button>}
                        {isActivate? <button onFocus={e => openSelectMenu(true)} className='profile-btn'>{firstname.substring(0,1).toUpperCase()}{lastname.substring(0,1).toUpperCase()}</button> : <button className='sign-btn' onClick={e => navigation('/authorization')}>Sign In</button>}
                        <button className='basket-btn'></button>

                        {selectMenu? <div className='css-figure'>
                            <button className='btn-figure' onClick={e => openSelectMenu(false)}></button>
                            <div className='just-figure' >
                                <a className='menu-option-profile' href="/profile" >Profile</a>
                                <a className='menu-option-settings' href="/">Settings</a>
                                <a className='menu-option-sign' onClick={signout}>Sign Out</a>
                            </div>
                        </div> : null}
                    </div>
                </div>
            </div>

            <Routes>
                <Route path='/' element={<Main/>}></Route>
                <Route path='profile/*' element={<Profile/>}></Route>
                <Route path='catalog' element={<Catalog/>}></Route>
            </Routes>
        </div>
    )
}

