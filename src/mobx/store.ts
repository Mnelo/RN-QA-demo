import { makeAutoObservable } from 'mobx';

class PhoneStore {
    phone: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    set(phone: string): void {
        this.phone = phone;
    }
}

export { PhoneStore };
