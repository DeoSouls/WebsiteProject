import React, { useEffect, useState, useContext } from 'react';
import { useRef } from 'react';
import { RInput } from '../../../Component/Input';
import api from '../../../axios-service';
import { useForm } from 'react-hook-form';
import { LoadingAccount } from '../../../Component/Load/LoadingAccount';
import { AccountContext } from '../../../App/Context';
import { Dialog } from '../../../Component/Dialog/Dialog';
import './Account.css';

export const Account = (props) => {

    var file = localStorage.getItem('file');

    const dialogRefConf = useRef();
    const dialogRefErr = useRef();
    
    const {register, handleSubmit} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [context, setContext] = useContext(AccountContext);
    var styles = null;

    const onSubmit = (data) => {
        console.log(data);

        const childs = dialogRefConf.current.childNodes;
        const childsErr = dialogRefErr.current.childNodes;

        if(childs[1].firstChild !== null) 
            childs[1].removeChild(childs[1].firstChild);
        if(childsErr[1].firstChild !== null) 
            childsErr[1].removeChild(childsErr[1].firstChild);

        api.post('http://localhost:5000/api/update', { data })
        .then(response => {
            var text = document.createTextNode(response.data.message);
            for (let i = 0; i < childs.length; i++) {
                if(i === 1)
                    childs[i].appendChild(text);
            }
            dialogRefConf.current.showModal();
            setUserData(data);
        })
        .catch(error => {
            var text = document.createTextNode(error.response.data.message);
            for (let i = 0; i < childsErr.length; i++) {
                if(i === 1)
                    childsErr[i].appendChild(text);
            }
            dialogRefErr.current.showModal();
        });
    } 

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true)
        },1000);
    },[])

    function setUserData(data) {
        api.post('http://localhost:5000/api/getuser', {
            email: data.email
        })
        .then(response => {console.log(response.data['user'][0]['firstname']), 
        localStorage.setItem('firstname', response.data['user'][0]['firstname']),
        localStorage.setItem('lastname', response.data['user'][0]['lastname']),
        localStorage.setItem('email', response.data['user'][0]['email']),
        setContext(data.firstname)})
        .catch(error => {console.log(error)});
    }

    function Load() {
        return <LoadingAccount/>
    }

    const handlerClick = (files) => {
        localStorage.removeItem('file');

        let preview = document.getElementById('account-img');
        let icon = document.getElementById('account-icon');

        preview.style.display = 'block';
        icon.style.backgroundColor = 'white';
        var reader = new FileReader();

        reader.onloadend = function () {
            preview.src = reader.result;
            localStorage.setItem('file', reader.result);
        }
        reader.readAsDataURL(files[0]);
    }

    if(file !== null) {
        styles = {display: 'block', backgroundColor: 'white'};
    }

    return (
        <div>
            {isLoading? <div>
                <div className='account-header'>
                    <div className='account-avatar'>Account Avatar</div>
                </div>
                <div className='account-main-img'>
                    <div className='account-icon' style={styles} id='account-icon' >
                        <img style={styles} className='account-img' id='account-img' src={file} alt="" />
                    </div>
                    <div className='icon-upload'>
                        <label htmlFor="upload" className='label-upload-btn'>Upload</label>
                        <input className='custom-file-input' id='upload' name='upload' type='file' onChange={e => handlerClick(e.currentTarget.files)} />
                        <p className='undercheck-upload'>Maximum file size of 1MB. Only .jpg and .png are supported.</p>
                    </div>
                </div>
                <div style={{paddingTop: '15px'}} className='account-header'>
                    <div className='account-avatar'>Profile</div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='profile-inputs' >
                    <div className='inputs-left'>
                        <label htmlFor="" className='label-userdata'>First Name</label>
                        <RInput idua={'7'} inwidth={'440px'} label='firstname' register={register}
                            type={'text'} marright={'25px'} mainwidth={'400px'} />
                        <label htmlFor="" className='label-userdata'>Email</label>
                        <RInput idua={'8'} inwidth={'440px'} label='email' register={register}
                            type={'text'} marright={'25px'} mainwidth={'400px'} />
                        <label htmlFor="" className='label-userdata'>Gender</label>
                        <RInput idua={'9'} inwidth={'440px'} label='gender' register={register}
                            type={'text'} marright={'25px'} mainwidth={'400px'}/>
                        <input className='update-btn' type="submit" />
                    </div>
                    <div className='inputs-right'>
                    <label htmlFor="" className='label-userdata'>Last Name</label>
                        <RInput idua={'10'} inwidth={'440px'} label='lastname' register={register} 
                            type={'text'} marright={'25px'} mainwidth={'400px'} />
                        <label htmlFor="" className='label-userdata'>Date of Birth</label>
                        <RInput idua={'11'} inwidth={'440px'} label='datebirth' register={register} 
                            type={'date'} marright={'25px'} mainwidth={'400px'}/>
                    </div>
                </form>
            </div> : Load()}
            <Dialog ref={dialogRefConf} type='confirm' index='1' />
            <Dialog ref={dialogRefErr} type='error' index='2' />
        </div>
    )
}