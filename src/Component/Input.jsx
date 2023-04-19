import React, { useRef } from 'react';
import styles from './Input.css'

export class RInput extends React.Component {

    plMount;

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }

        this.plMount = false;

        this.handlerInput = this.handlerInput.bind(this);
        this.handlerFocus = this.handlerFocus.bind(this);
        this.blurPlaceholder = this.blurPlaceholder.bind(this);
        this.inputFocus = this.inputFocus.bind(this);
        this.inputFocus = this.inputFocus.bind(this);
        this.inputBlur = this.inputBlur.bind(this);
    }

    handlerInput(event) {

        const placeholder = document.getElementById(`rinput-placeholder ${this.props.idua}`);

        placeholder.style.scale = '0.7';
        placeholder.style.translate = '-12px -17px';
        placeholder.style.color = 'black';

        this.setState({value: event.target.value});
        this.props.changeValue(event.target.value);
        this.plMount = true;
    }
    
    handlerFocus(event) {
        const input = document.getElementById(`r_input ${this.props.idua}`);
        input.focus();
    }

    blurPlaceholder() {
        const placeholder = document.getElementById(`rinput-placeholder ${this.props.idua}`);

        placeholder.style.scale = '1';
        placeholder.style.translate = '0'

        placeholder.style.color = 'rgb(165, 165, 165)';
    }

    inputFocus(event) {
        const inputForm = document.getElementById(`inputs-form ${this.props.idua}`);
        inputForm.style.borderColor = 'black';
    }

    inputBlur(event) {
        const inputForm = document.getElementById(`inputs-form ${this.props.idua}`);
        inputForm.style.borderColor = 'rgb(212, 212, 212)';
    }

    render() {

        if(this.state.value === '' & this.plMount) {
            this.blurPlaceholder();
        }   

        return (
            <div style={{width: this.props.inwidth, marginRight: this.props.marright, marginTop: this.props.marTop}} 
            id={`inputs-form ${this.props.idua}`} className='inputs-form' onClick={this.handlerFocus}>
                <p id={`rinput-placeholder ${this.props.idua}`} className='rinput-placeholder'>{this.props.placeholder}</p>
                {this.props.children}
                <input onChange={this.handlerInput} id={`r_input ${this.props.idua}`} onFocus={this.inputFocus} onBlur={this.inputBlur} 
                className='r_input' type={this.props.type} style={{width: this.props.mainwidth}} value={this.props.value}/>
            </div>
        )
    }
} 