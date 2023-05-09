import React, {useEffect, useState} from 'react';
import { Route, Routes, useNavigate} from 'react-router';
import { FeedBack } from './FeedBack/FeedBack';
import { Sent } from './Sent/Sent';
import { Incoming } from './Incoming/Incoming'; 
import api from '../../axios-service';
import './Contact.css';

export const Contact = (props) => {

    useEffect(() => {
        getUser();
    },[])
    
    const navigation = useNavigate();
    const [adminValues, setAdminValues] = useState('');

    function getUser() {
        api.post('http://localhost:5000/api/getuser')
        .then(response => {
            console.log(response.data);
            if(response.data.user[0].role === 'admin') {
                setAdminValues(response.data.user[0].role);
                console.log(response.data.user[0].role);
            }
        })
        .catch(error => console.log(error));
    }

    function handlerClick(event) {
        const contactNav = document.getElementById('nav-open');
        const contactNav2 = document.getElementById('nav-close');
        var btnRoute1 = null;
        if(adminValues === '') {
            btnRoute1 = document.getElementById('btn-route1');
        } 
        const btnRoute2 = document.getElementById('btn-route2');
        const btnRoute3 = document.getElementById('btn-route3');

        if(contactNav !== null) {
            contactNav.style.width = '70px';
            contactNav.id = 'nav-close';

            event.target.style.rotate = '-180deg';
            if(adminValues === '') {
                btnRoute1.style.width = '50px';
                btnRoute1.style.color = 'transparent';
                btnRoute1.style.pointerEvents = 'none';
            } 

            btnRoute2.style.width = '50px';
            btnRoute2.style.color = 'transparent';
            btnRoute2.style.pointerEvents = 'none';
            btnRoute3.style.width = '50px';
            btnRoute3.style.color = 'transparent';
            btnRoute3.style.pointerEvents = 'none';
        } else {
            contactNav2.style.width = '400px';
            contactNav2.id = 'nav-open';

            event.target.style.rotate = '0deg';
            if(adminValues === '') {
                btnRoute1.style.width = '260px';
                btnRoute1.style.visibility = 'visible';
                btnRoute1.style.color = 'black';
                btnRoute1.style.pointerEvents = 'all';
            } 

            btnRoute2.style.width = '260px';
            btnRoute2.style.color = 'black';
            btnRoute2.style.pointerEvents = 'all';
            btnRoute3.style.width = '260px';
            btnRoute3.style.color = 'black';
            btnRoute3.style.pointerEvents = 'all';
        }
    }

    return (
        <div>
            <div className='contact-container'>
                <div className='contact-navigator' id='nav-open'>
                    <div className='switch-container'>
                        <button className='switch-cnt-navigator' onClick={e => handlerClick(e)}></button>
                    </div>
                    <div className='router-container'>

                        {adminValues !== ''? null : <div>
                            <button className='btn-route' id='btn-route1' onClick={e => navigation('/contact/feedback')}>Техподдержка</button>
                        </div>}
                        <div>
                            <button className='btn-route' id='btn-route2' onClick={e => navigation('/contact/sent')}>Отправленные</button>
                        </div>
                        <div>
                            <button className='btn-route' id='btn-route3' onClick={e => navigation('/contact/incoming')}>Входящие</button>
                        </div>
                    </div>
                </div>
                <div className='contact-content'>
                    <Routes>
                        <Route path='feedback' element={<FeedBack/>}/>
                        <Route path='sent' element={<Sent/>}/>
                        <Route path='incoming' element={<Incoming user={adminValues}/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}