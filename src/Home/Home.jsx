import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate} from 'react-router';
import { Profile } from './Profile/Profile';
import { Catalog } from './Catalog/Catalog';
import { useAppDispatch, useAppSelector } from '../slice/hook/redux'
import { fetchUsers } from '../slice/usersSlice';
import { observable} from 'mobx';
import { Main } from '../Main/Main';
import { useContext } from 'react';
import { AccountContext } from '../App/Context';
import api from '../axios-service';
import { Basket } from './Basket/Basket'; 
import { ProductPage } from '../Home/Catalog/ProductPage/ProductPage';
import './Home.css';

export const Home = (props) => {

    const [isSearch, setIsSearch] = useState(false);
    const [selectMenu, openSelectMenu] = useState(false);
    const [groupValue, setGroup] = useState('');

    const [context, setContext] = useContext(AccountContext);

    const navigation = useNavigate();

    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.users);

    var name = observable({firstname: '', lastname: ''});
    var isActivate = false;

    useEffect(() => {
        dispatch(fetchUsers());
    },[context])

    function searchFunc(event) {
        if (event.keyCode === 13) {
            const searchText = event.target.value;

            api.post('http://localhost:5000/api/search', {searchText: searchText})
            .then(response => {
                let good = response.data;
                if(Object.keys(good).length > 0) {
                    navigation(`/catalog/product/${good.products.id}`);
                    location.reload();
                }
            })
            .catch(error => console.error(error));
        }
    }

    const search = (
        <div className='search'>
            <div className='searching-img'></div>
            <input className='search-input' type="text" onBlur={hideSearch} placeholder='Search' onKeyDown={e => searchFunc(e)}/>
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

    function onGroup(event) {
        setGroup(event.target.id);
        navigation('/catalog');
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
        localStorage.removeItem('isActivate');
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
    }

    isActivate = localStorage.getItem('isActivate');
    name.firstname = localStorage.getItem('firstname');
    name.lastname = localStorage.getItem('lastname');
    
    return (
        <div>
            <div className='nav-bar'>
                <div className='nav-bar-btns'>
                    <a className='website-logo' href='/' > 
                        <p className='website-logo'>WebSite</p>
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
                        {isActivate? <button onFocus={e => openSelectMenu(true)} className='profile-btn'>{name.firstname.substring(0,1).toUpperCase()}{name.lastname.substring(0,1).toUpperCase()}</button> : <button className='sign-btn' onClick={e => navigation('/authorization')}>Sign In</button>}
                        <button className='basket-btn' onClick={e => navigation('/basket')} ></button>
                        {selectMenu? <div className='css-figure'>
                            <button className='btn-figure' onClick={e => openSelectMenu(false)}></button>
                            <div className='just-figure' >
                                <a className='menu-option-profile' href="/profile/account" >Profile</a>
                                <a className='menu-option-settings' href="/">Settings</a>
                                <a className='menu-option-sign' onClick={signout}>Sign Out</a>
                            </div>
                        </div> : null}
                    </div>
                </div>
            </div>

            <Routes>
                <Route path='/' element={<Main onGroup={e => onGroup(e)} />}></Route>
                <Route path='profile/*' element={<Profile first={name.firstname} last={name.lastname}/>}></Route>
                <Route path='catalog' element={<Catalog prodGroup={groupValue}/>}></Route>
                <Route path='catalog/product/:prodId' element={<ProductPage/>}></Route>
                <Route path='basket' element={<Basket/>}></Route>
                <Route path='*' element={<h1>Страница не найдена</h1>}></Route>
            </Routes>
        </div>
    )
}

