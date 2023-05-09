import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../../axios-service';
import { Dialog } from '../../../Component/Dialog/Dialog';
import './FeedBack.css';

export const FeedBack = (props) => {

    const {register, handleSubmit} = useForm();
    const dialogRefConf = useRef();
    const dialogRefErr = useRef();

    const onSubmit = (data) => {

        console.log(data);

        const childsConf = dialogRefConf.current.childNodes;
        const childsErr = dialogRefErr.current.childNodes;
        const date = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/')

        if(childsConf[1].firstChild !== null) 
            childsConf[1].removeChild(childsConf[1].firstChild);
        if(childsErr[1].firstChild !== null) 
            childsErr[1].removeChild(childsErr[1].firstChild);

        api.post('http://localhost:5000/api/sent_qstn', {data, date})
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

    return (
        <div className='feedback-container'>
            <div className='feedback-form'>
                <div className='form-header'>
                    Заголовок
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='title-input'>
                        <label className='text-label' > Как бы вы в общем описали вопрос?</label>
                        <div>
                            <input className='text-input' type="text" {...register('title')} required/>
                        </div>
                    </div>
                    <div className='form-header'>
                        Вопрос
                    </div>
                    <div className='question-container'>
                        <label className='text-label' htmlFor="">Опишите проблему или предложение</label>
                        <textarea className='question-textarea' {...register('question')} required></textarea>
                    </div>
                    <input className='submit-question' type="submit" />
                </form>
            </div>
            <div className='feedback-rules'>
                <div className='form-header'>
                    Правила обращения в службу поддержки
                </div>
                <div className='rules-content'>
                    <p className='rules-part'>1. Мы будем вести с Вами диалог до тех пор, пока не будет получена вся необходимая информация для решения вопроса.</p>
                    <p className='rules-part'>2. Правильно заданный вопрос содержит половину ответа, правильно сформулированное предложение сокращает время его реализации.</p>
                    <p className='rules-part'>3. Описание проблемы/предложения должно быть строго в терминах системы, то есть пошаговым, без пропусков действий, без обобщений, без использования неоднозначного сленга.</p>
                    <p className='rules-part'>4. Описание проблемы/предложения не должно допускать никаких разночтений, допущений и предположений.</p>
                    <p className='rules-part'>5. Отвечайте на все вопросы сотрудников службы технической поддержки. Если формулировка вопроса не ясна или непонятно, какие действия необходимо предпринять для составления ответа — сообщите об этом.</p>
                </div>
            </div>
            <Dialog ref={dialogRefConf} type='confirm' index='1'  />
            <Dialog ref={dialogRefErr} type='error' index='2' />
        </div>
    )
}