import React, {useState, useRef} from "react";
import api from "../axios-service";
import { RInput } from '../Component/Input'
import { useNavigate } from "react-router";
import { Dialog } from "../Component/Dialog/Dialog";
import { TempAuth } from "../Component/template/tempAuth";
import './Registre.css';

export const Registre = () => {

    const [firstnameValue, setFirstNameValue] = useState('');
    const [lastnameValue, setLastNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const navigation = useNavigate();

    const dialogRefConf = useRef();
    const dialogRefErr = useRef();

    function push_userdata() {

        const childsErr = dialogRefErr.current.childNodes;
        const childsConf = dialogRefConf.current.childNodes;

        if(childsErr[1].firstChild !== null) {

            childsErr[1].removeChild(childsErr[1].firstChild);
        }

        api.post('http://localhost:5000/api/registration', {firstname: firstnameValue, 
        lastname: lastnameValue, email: emailValue, password: passwordValue})
        .then((response) => {
            console.log(response.data);
            var text = document.createTextNode('Вам выслано письмо с ссылкой активации аккаунта');
            childsConf[1].appendChild(text);
            dialogRefConf.current.showModal();
        })
        .catch(error => {
            console.log(error);
            var text = document.createTextNode(error.response.data.error);
            childsErr[1].appendChild(text);
            dialogRefErr.current.showModal();
        })
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
            <Dialog ref={dialogRefConf} type='confirm' index='1' />
            <Dialog ref={dialogRefErr} type='error' index='2' />
        </TempAuth>
    )
}