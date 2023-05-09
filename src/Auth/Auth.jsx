import React,{useRef, useState} from 'react';
import { TempAuth } from '../Component/template/tempAuth';
import { useNavigate } from 'react-router';
import { RInput } from '../Component/Input';
import api from '../axios-service';
import { Dialog } from '../Component/Dialog/Dialog';
import './Auth.css';

export const Auth = () => {

    const [valueMail, setValueMail] = useState('');
    const [valuePass, setValuePass] = useState('');
    const navigation = useNavigate();
    const dialogRefErr = useRef();

    function push_data() {

        const childs = dialogRefErr.current.childNodes;
        if(childs[1].firstChild !== null) 
            childs[1].removeChild(childs[1].firstChild);

        api.post('http://localhost:5000/api/login', 
        {email: valueMail, password: valuePass})
        .then(res => {navigation('/')})
        .catch(error => {
            console.log(error);
            var text = document.createTextNode(error.response.data.error);
            childs[1].appendChild(text);
            dialogRefErr.current.showModal();
        });
    }

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
            <Dialog ref={dialogRefErr} type='error' />
            <p className='navigate_registre'>No Account? <a className='navigate' onClick={e => navigation('/registre')}>Start Here</a></p>
        </TempAuth>
    )
}