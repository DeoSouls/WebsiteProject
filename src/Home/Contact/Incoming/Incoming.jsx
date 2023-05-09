import React, {useEffect, useRef, useState} from 'react';
import { Dialog } from '../../../Component/Dialog/Dialog';
import { useForm } from 'react-hook-form';
import api from '../../../axios-service';
import './Incoming.css';

export const Incoming = (props) => {

    useEffect(() => {
        getUser();
    }, []);

    const dialogRefErr = useRef();
    const dialogRefConf = useRef();
    const messagesRef = useRef(null);

    const [messageValue, setMessageValue] = useState([]);
    const [messageId, setMessageId] = useState(null);
    const [isShow, setIsShow] = useState(false);

    const {register, handleSubmit} = useForm();

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
        const childsErr = dialogRefErr.current.childNodes;
        console.log(messagesRef.current);
        if(messagesRef.current !== null) {
            api.get('http://localhost:5000/api/get_sents_admin')
            .then(response => {setMessageValue(response.data)})
            .catch(error => {
                var text = document.createTextNode(error.response.data.error);
                childsErr[1].appendChild(text);
                dialogRefErr.current.showModal();
            });
        } else {
            api.get('http://localhost:5000/api/get_incoming')
            .then(response => {console.log(response.data), setMessageValue(response.data)})
            .catch(error => {
                var text = document.createTextNode(error.response.data.error);
                childsErr[1].appendChild(text);
                dialogRefErr.current.showModal();
            });
        }
    }

    const onSubmit = (data) => {

        console.log(data);

        const childsConf = dialogRefConf.current.childNodes;
        const childsErr = dialogRefErr.current.childNodes;
        const date = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')

        if(childsErr[1].firstChild !== null) {
            childsErr[1].removeChild(childsErr[1].firstChild);
        }

        api.post('http://localhost:5000/api/incoming_asw', {data, date, userId: messageValue.users[messageId][0].id, sentId: messageValue.message[messageId].id})
        .then(response => {
            var text = document.createTextNode(response.data.message);
            childsConf[1].appendChild(text);
            dialogRefConf.current.showModal();
        })
        .catch(error => {
            var text = document.createTextNode(error.response.data.error);
            childsErr[1].appendChild(text);
            dialogRefErr.current.showModal();
        });
    }

    function handlerGetIdMessage(event) {

        let id = event.currentTarget.id;
        let array = Array.from(id);
        let msgId = array[array.length -1];

        setMessageId(msgId);
    }

    function switchShowing() {
        if(!isShow)
            setIsShow(true);
        else
            setIsShow(false);
    }

    function showMessage() {
        if (messageId !== null) {

            var showmsg = [];
            if(messageValue.users !== undefined) {
                showmsg.push(
                    <div className='from-content'>
                        <div style={{display: 'flex'}}>
                            <p className='dynamic-desc'>{messageValue.message[messageId].date}</p> 
                            <p className='dynamic-desc'>От кого: {messageValue.users[messageId][0].firstname} {String(messageValue.users[messageId][0].lastname).substring(0,1).toLocaleUpperCase()}.</p>
                            <p className='dynamic-desc'>Кому: Техподдержка</p>
                        </div>
                        <div className='form-title' style={{marginBottom: '30px'}}>
                            {messageValue.message[messageId].title}
                        </div>
                        <div className='form-message'>
                            <p>{messageValue.message[messageId].message}</p>
                        </div>
                        {messagesRef.current === 'admin'? <button className='switch-answer' onClick={e => switchShowing()}>Ответить</button> : null}
                    </div>
                )
                return [...showmsg]
            } else {
                showmsg.push(
                    <div className='from-content'>
                        <div style={{display: 'flex'}}>
                            <p className='dynamic-desc'>{messageValue.message[messageId].date}</p> 
                            <p className='dynamic-desc'>От кого: Техподдержка</p>
                            <p className='dynamic-desc'>Кому: Мне</p>
                        </div>
                        <div className='form-title' style={{marginBottom: '30px'}}>
                            Ответ на сообщение {messageValue.message[messageId].sentId}
                        </div>
                        <div className='form-message'>
                            <p>{messageValue.message[messageId].message}</p>
                        </div>
                        {messagesRef.current === 'admin'? <button className='switch-answer' onClick={e => switchShowing()}>Ответить</button> : null}
                    </div>
                )
                return [...showmsg]
            }
        }
    }

    function showSentForm() {
        var sentForm = [];

        sentForm.push(
            <div className='incoming-form'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-header'>
                        Ответ
                    </div>
                    <div className='question-container'>
                        <textarea className='answer-textarea' {...register('answer')} required></textarea>
                    </div>
                    <input className='submit-question' type="submit" />
                </form>
            </div>
        )
        return [...sentForm]
    }

    function sentMessage() {

        if(messageValue.message !== undefined) {
            var msgBlock = [];
            for (let i = 0; i < messageValue.message.length; i++) {
                if(messageValue.message[i].userId !== 3 && messageValue.users !== undefined) {
                    msgBlock.push(
                        <div className='message-block' id={`message-block${i}`} onClick={e => handlerGetIdMessage(e)}>
                            <div className='message-date'>
                                <p className='message-otherdata'>От кого: {messageValue.users[i][0].firstname} {String(messageValue.users[i][0].lastname).substring(0,1).toLocaleUpperCase()}.</p>
                                <p className='message-otherdata'>Кому: Техподдержка</p>
                                <p className='message-otherdata'>{messageValue.message[i].date}</p>
                            </div>
                            <div className='message-content'>
                                <p className='message-title'>{messageValue.message[i].title}</p>
                                <p className='message-msg'>{messageValue.message[i].message}</p>
                            </div>
                        </div>
                    )
                } else {
                    msgBlock.push(
                        <div className='message-block' id={`message-block${i}`} onClick={e => handlerGetIdMessage(e)}>
                            <div className='message-date'>
                                <p className='message-otherdata'>От кого: Техподдержка</p>
                                <p className='message-otherdata'>Кому: Мне</p>
                                <p className='message-otherdata'>{messageValue.message[i].date}</p>
                            </div>
                            <div className='message-content'>
                                <p className='message-title'>Ответ на сообщение {messageValue.message[i].sentId}</p>
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
                    {isShow? showSentForm() : null}
                </div>
                <div className='sent-block'>
                    <div className='form-header' style={{marginBottom: '30px'}}>
                        {messagesRef.current === 'admin'? <>Отправленные сообщения от пользователей</> : <>Полученные сообщения от техподдержки</>}
                    </div>
                    {sentMessage() !== undefined? sentMessage() 
                    : <div className='no-message'>
                        <p className='no-message-header'>Вы пока не сообщали о проблеме</p>
                    </div>}
                </div>
            </div>
            <Dialog ref={dialogRefConf} type='confirm' index='1' />
            <Dialog ref={dialogRefErr} type='error' index='2' />
        </div>
    )
}