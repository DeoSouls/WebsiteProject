import { action, makeObservable, observable } from 'mobx';

class Counter {
    count

    constructor(count) {
        makeObservable(this, {
            count: observable,
            increment: action,
            decrement: action
        })
        this.count = count;
    }

    increment() {
        if (this.count > 1) {

        }
        this.count++;
    }

    decrement() {
        if (this.count > 1) {
            this.count--;
        }
    }
}

export default Counter;