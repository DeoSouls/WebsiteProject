import React, {useState} from "react";
import axios from "axios";
import { $api } from "../axios-service";
import './Registre.css';
import { RInput } from '../Component/Input'
import { useNavigate } from "react-router";
import { TempAuth } from "../Component/template/tempAuth";

export const Registre = () => {

    const [firstnameValue, setFirstNameValue] = useState('');
    const [lastnameValue, setLastNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const navigation = useNavigate();

    function push_userdata() {
        const api = $api();
        // const response = api.post('http://localhost:5000/api/registration', 
        // {firstname:'vlad', lastname:'purikov', email: 'maltondeo@gmail.com', password: '1234'});

        const response = api.post('http://localhost:5000/api/registration', 
        {firstname: firstnameValue, lastname: lastnameValue, email: emailValue, password: passwordValue});

        // axios.post('http://localhost:5000/api/registration', {firstname:'vlad', lastname:'purikov', email: 'maltondeo@gmail.com', password: '1234'},
        // { headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((data) => console.log(data));

        response.then((data) => {console.log(data), alert('Вам выслано письмо с ссылкой активации аккаунта')});
    }

    return (
        <TempAuth temp={'1'} header={'Create your account'} data={'01/ 02'}>
            <p className="reg-required">*Required</p>
            <div className="reg-username">
                <RInput idua={'1'} inwidth={'200px'} placeholder={'First Name*'} 
                type={'text'} changeValue={setFirstNameValue} marright={'25px'} value={firstnameValue}/>
                <RInput idua={'2'} inwidth={'200px'} placeholder={'Last Name*'} 
                type={'text'} changeValue={setLastNameValue} value={lastnameValue}/>
            </div>
            <RInput idua={'3'} inwidth={'425px'} placeholder={'Email*'} marTop={'25px'} mainwidth={'390px'}
            type={'text'} changeValue={setEmailValue} value={emailValue}/>
            <RInput idua={'4'} inwidth={'425px'} placeholder={'Password*'} marTop={'25px'} mainwidth={'390px'}
            type={'password'} changeValue={setPasswordValue} value={passwordValue}/>
            <button className="btn-continue" onClick={push_userdata}>Continue</button>
            <div className="other">
                <p className="other-variant">--or--</p>
            </div>
            <div className="other">
                <p className="other-switch">Already have an account? <a className="other-switch" onClick={e => navigation('/authorization')} >Sign In</a></p>
            </div>
        </TempAuth>
    )
}