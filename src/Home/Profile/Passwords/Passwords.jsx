import React from 'react';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { RInput } from '../../../Component/Input';
import { Dialog } from '../../../Component/Dialog/Dialog';
import api from '../../../axios-service';
import './Passwords.css';

export const Passwords = (props) => {

    const {register, handleSubmit} = useForm();
    const dialogRefErr = useRef();
    const dialogRefConf = useRef();


    const onSubmit = (data) => {

        const childsConf = dialogRefConf.current.childNodes;
        const childsErr = dialogRefErr.current.childNodes;

        if(childsErr[1].firstChild !== null) {
            childsErr[1].removeChild(childsErr[1].firstChild);
        }

        api.post('http://localhost:5000/api/update_pass', {data})
        .then(response => {
            console.log(response.data);
            var text = document.createTextNode(response.data.message);
            childsConf[1].appendChild(text);
            dialogRefConf.current.showModal();
        })
        .catch(error => {
            console.log(error);
            var text = document.createTextNode(error.response.data.error);
            childsErr[1].appendChild(text);
            dialogRefErr.current.showModal();
        });
    }

    return (
        <div>
            <div className='passwords-header'>
                <div className='passwords-avatar'>Change password</div>
            </div>
            <div>
                <form className='passwords-container' onSubmit={handleSubmit(onSubmit)} >
                    <label htmlFor="" className='label-userdata'>Current password</label>
                    <RInput idua={'12'} inwidth={'440px'} label='curpass' register={register} 
                        type={'password'} marright={'25px'} mainwidth={'400px'}/>
                    <label htmlFor="" className='label-userdata'>New password</label>
                    <RInput idua={'13'} inwidth={'440px'} label='newpass' register={register} 
                        type={'password'} marright={'25px'} mainwidth={'400px'}/>
                    <label htmlFor="" className='label-userdata'>Confirm password</label>
                    <RInput idua={'14'} inwidth={'440px'} label='confpass' register={register} 
                        type={'password'} marright={'25px'} mainwidth={'400px'}/>
                    <input className='update-btn' type="submit" />
                </form>
                <Dialog ref={dialogRefErr} type='error' index='1' />
                <Dialog ref={dialogRefConf} type='confirm' index='2' />
            </div>
        </div>
    )
}