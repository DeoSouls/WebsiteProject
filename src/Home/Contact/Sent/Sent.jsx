import React, { useState, useEffect, useRef } from 'react';
import api from '../../../axios-service';
import { Dialog } from '../../../Component/Dialog/Dialog';
import './Sent.css';

export const Sent = (props) => {

    useEffect(() => {
        getUser();
    }, []);

    const dialogRefErr = useRef();
    const messagesRef = useRef(null);

    const [messageValue, setMessageValue] = useState([]);
    const [messageId, setMessageId] = useState(null);

    function getUser() {
        api.post('http://localhost:5000/api/getuser')
        .then(response => {
            if(response.data.user[0].role === 'admin') {
                messagesRef.current = response.data.user[0].role;
            }
            getMessage();
        })
        .catch(error => console.log(error));
    }

    function getMessage() {
        console.log(messagesRef.current);
        const childsErr = dialogRefErr.current.childNodes;
        
        if(childsErr[1].firstChild !== null) 
            childsErr[1].removeChild(childsErr[1].firstChild);

        if(messagesRef.current === null) {
            api.get('http://localhost:5000/api/get_sents')
            .then(response => { setMessageValue(response.data)})
            .catch(error => {
                var text = document.createTextNode(error.response.data.error);
                childsErr[1].appendChild(text);
                dialogRefErr.current.showModal();
            });
        } else {
            api.get('http://localhost:5000/api/get_incoming_admin')
            .then(response => { setMessageValue(response.data)})
            .catch(error => {
                var text = document.createTextNode(error.response.data.error);
                childsErr[1].appendChild(text);
                dialogRefErr.current.showModal();
            });
        }
        
    }

    function handlerGetIdMessage(event) {

        let id = event.currentTarget.id;
        let array = Array.from(id);
        let msgId = array[array.length -1];

        setMessageId(msgId);
    }

    function showMessage() {
        if (messageId !== null) {

            var showmsg = [];
            if(messageValue.users !== undefined) {
                showmsg.push(
                    <div className='from-content'>
                        <div style={{display: 'flex'}}>
                            <p className='dynamic-desc'>{messageValue.message[messageId].date}</p> 
                            <p className='dynamic-desc'>От кого: Техподдержка</p>
                            <p className='dynamic-desc'>Кому: {messageValue.users[messageId][0].firstname} {String(messageValue.users[messageId][0].lastname).substring(0,1).toLocaleUpperCase()}.</p>
                        </div>
                        <div className='form-title' style={{marginBottom: '30px'}}>
                            Ответ на сообщение {messageValue.message[messageId].sentId}
                        </div>
                        <div className='form-message'>
                            <p>{messageValue.message[messageId].message}</p>
                        </div>
                    </div>
                )
                return [...showmsg]
            } else {
                showmsg.push(
                    <div className='from-content'>
                        <div style={{display: 'flex'}}>
                            <p className='dynamic-desc'>{messageValue.message[messageId].date}</p> 
                            <p className='dynamic-desc'>От кого: Я</p>
                            <p className='dynamic-desc'>Кому: Техподдержка</p>
                        </div>
                        <div className='form-title' style={{marginBottom: '30px'}}>
                            {messageValue.message[messageId].title}
                        </div>
                        <div className='form-message'>
                            <p>{messageValue.message[messageId].message}</p>
                        </div>
                    </div>
                )
                return [...showmsg]
            }
        }
    }

    function sentMessage() {

        if(messageValue.message !== undefined) {
            var msgBlock = [];
            for (let i = 0; i < messageValue.message.length; i++) {
                if (messageValue.users !== undefined) {
                    msgBlock.push(
                        <div className='message-block' id={`message-block${i}`} onClick={e => handlerGetIdMessage(e)}>
                            <div className='message-date'>
                                <p className='message-otherdata'>От кого: Техподдержка</p>
                                <p className='message-otherdata'>Кому: {messageValue.users[i][0].firstname} {String(messageValue.users[i][0].lastname).substring(0,1).toLocaleUpperCase()}.</p>
                                <p className='message-otherdata'>{messageValue.message[i].date}</p>
                            </div>
                            <div className='message-content'>
                                <p className='message-title'>Ответ на сообщение {messageValue.message[i].sentId}</p>
                                <p className='message-msg'>{messageValue.message[i].message}</p>
                            </div>
                        </div>
                    )
                } else {
                    msgBlock.push(
                        <div className='message-block' id={`message-block${i}`} onClick={e => handlerGetIdMessage(e)}>
                            <div className='message-date'>
                                <p className='message-otherdata'>От кого: Я</p>
                                <p className='message-otherdata'>Кому: Техподдержка</p>
                                <p className='message-otherdata'>{messageValue.message[i].date}</p>
                            </div>
                            <div className='message-content'>
                                <p className='message-title'>{messageValue.message[i].title}</p>
                                <p className='message-msg'>{messageValue.message[i].message}</p>
                            </div>
                        </div>
                    )
                }
            }
            return [...msgBlock]
        }
    }

    return (
        <div>
            <div className='sent-container'>
                <div className='sent-content'>
                    {showMessage()}
                </div>
                <div className='sent-block'>
                    <div className='form-header' style={{marginBottom: '30px'}}>
                        Отправленные сообщения
                    </div>
                    {sentMessage() !== undefined? sentMessage() 
                    : <div className='no-message'>
                        <p className='no-message-header'>Вы пока не сообщали о проблеме</p>
                    </div>}
                </div>
            </div>
            <Dialog ref={dialogRefErr} type='error' />
        </div>
    )
}