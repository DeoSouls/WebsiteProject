import React,{useEffect, useRef, useState} from 'react';
import { TempAuth } from '../Component/template/tempAuth';
import { useNavigate } from 'react-router';
import { RInput } from '../Component/Input';
import { $api } from '../axios-service';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import { useSpring, useTransition, animated, useSpringRef } from '@react-spring/web';
import './Auth.css';

export const Auth = () => {

    const [valueMail, setValueMail] = useState('');
    const [valuePass, setValuePass] = useState('');
    const [valueMount, setValueMount] = useState(true);
    const navigation = useNavigate();
    const springRef = useSpringRef();

    useEffect(() => {
        
    },[])

    function push_data() {
        const api = $api();
        api.post('http://localhost:5000/api/login', 
        {email: valueMail, password: valuePass})
        .then(res => {console.log(res), navigation('/')})
        .catch(err => {console.log(err) ,alert(err)});
    }

    const springs = useSpring({
        from: { background: 'linear-gradient(90deg,rgb(218, 218, 218), rgb(248, 248, 248),1%,rgb(248, 248, 248),40%,rgb(238, 238, 238))'},
        to: { background: 'linear-gradient(90deg,rgb(218, 218, 218),rgb(248, 248, 248),200%,rgb(248, 248, 248), 170%,rgb(238, 238, 238))'},
        config: {
            duration: 1000,
        },
        loop: true,
    });

    return (
        <TempAuth temp={'2'} header={'Welcome Back'}>
            <p className='header_sign'>Sign In</p>
            <div className='header_border'></div>
            <RInput idua={'5'} inwidth={'400px'} placeholder={'Email'} marTop={'75px'} mainwidth={'360px'} 
            type={'text'} changeValue={setValueMail} value={valueMail}>
            </RInput>
            <RInput idua={'6'} inwidth={'400px'} placeholder={'Password'} marTop={'20px'} mainwidth={'360px'}
            type={'password'} changeValue={setValuePass} value={valuePass}>
            </RInput>
            <input id='check_device' className='check_device' type="checkbox" />
            <label className='label_check_device' htmlFor="check_device">Remember this device</label>
            <button className='btn_signin' onClick={push_data}>Sign In</button>
            <p className='navigate_registre'>No Account? <a className='navigate' onClick={e => navigation('/registre')}>Start Here</a></p>
        </TempAuth>
    )
}