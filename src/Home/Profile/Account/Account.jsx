import React, { useEffect, useState, useContext } from 'react';
import { RInput } from '../../../Component/Input';
import api from '../../../axios-service';
import { Loading } from '../../../Component/Load/Load';
import { AccountContext } from '../../../App/Context';
import './Account.css';

export const Account = (props) => {

    var firstname = props.name.first;
    var lastname = props.name.last;
    var file = localStorage.getItem('file');
    var email = localStorage.getItem('email');
    const [fInput, savefInputValue] = useState(firstname);
    const [eInput, saveEInputValue] = useState(email);
    const [gInput, savegInputValue] = useState('');
    const [lInput, savelInputValue] = useState(lastname);
    const [dInput, savedInputValue] = useState('');
    const [gabInput, savegabInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [context, setContext] = useContext(AccountContext);
    var styles = null;

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true)
        },2000);
    },[])

    function updateUser() {
        api.post('http://localhost:5000/api/update', {
            firstname: fInput,
            lastname: lInput,
            email: eInput
        })
        .then(response => {alert(response.data['message']), setUserData()})
        .catch(error => {alert(error), console.log(error)});
    }

    function setUserData() {
        api.post('http://localhost:5000/api/getuser', {
            email: eInput
        })
        .then(response => {console.log(response.data['user'][0]['firstname']), 
        localStorage.setItem('firstname', response.data['user'][0]['firstname']),
        localStorage.setItem('lastname', response.data['user'][0]['lastname']),
        localStorage.setItem('email', response.data['user'][0]['email']),
        setContext(fInput)})
        .catch(error => {alert(error), console.log(error)});
    }

    function Load() {
        // setTimeout(() => {
        //     setIsLoading(true)
        // },2000);
        return <Loading/>
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
                <div style={{paddingTop: '55px'}} className='account-header'>
                    <div className='account-avatar'>Profile</div>
                </div>
                <div className='profile-inputs'>
                    <div className='inputs-left'>
                        <label htmlFor="" className='label-userdata'>First Name</label>
                        <RInput idua={'7'} inwidth={'440px'}  
                        type={'text'} changeValue={savefInputValue} marright={'25px'} mainwidth={'400px'} value={fInput}/>
                        <label htmlFor="" className='label-userdata'>Email</label>
                        <RInput idua={'8'} inwidth={'440px'}  
                        type={'text'} changeValue={saveEInputValue} marright={'25px'} mainwidth={'400px'} value={eInput}/>
                        <label htmlFor="" className='label-userdata'>Gender</label>
                        <RInput idua={'9'} inwidth={'440px'}  
                        type={'text'} changeValue={savegInputValue} marright={'25px'} mainwidth={'400px'} value={gInput}/>
                        <button className='update-btn' onClick={updateUser}>Update</button>
                    </div>
                    <div className='inputs-right'>
                    <label htmlFor="" className='label-userdata'>Last Name</label>
                        <RInput idua={'10'} inwidth={'440px'}  
                        type={'text'} changeValue={savelInputValue} marright={'25px'} mainwidth={'400px'} value={lInput}/>
                        <label htmlFor="" className='label-userdata'>Date of Birth</label>
                        <RInput idua={'11'} inwidth={'440px'}  
                        type={'text'} changeValue={savedInputValue} marright={'25px'} mainwidth={'400px'} value={dInput}/>
                        <label htmlFor="" className='label-userdata'>Gender assigned at birth</label>
                        <RInput idua={'12'} inwidth={'440px'}  
                        type={'text'} changeValue={savegabInputValue} marright={'25px'} mainwidth={'400px'} value={gabInput}/>
                    </div>
                </div>
            </div> : Load()}
        </div>
    )
}