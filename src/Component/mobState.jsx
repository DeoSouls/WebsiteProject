import { makeAutoObservable, observable } from 'mobx';

export const mobState = (value) => {

    return makeAutoObservable({
        value: value,
        get getValue() {
            return this.value
        },
        changeValue(value) {
            this.value = value;
        }
   })
}