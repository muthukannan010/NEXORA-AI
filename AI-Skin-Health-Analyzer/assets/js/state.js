// assets/js/state.js

class State {
    constructor() {
        this.data = {
            currentUser: null,
            session: null,
            profile: null,
            currentPlan: null,
            usage: null,
            history: [],
            notifications: [],
            currentScan: null,
            currentResult: null,
            theme: localStorage.getItem('theme') || 'light'
        };
        this.listeners = [];
    }

    get(key) {
        return this.data[key];
    }

    set(key, value) {
        this.data[key] = value;
        this.notify(key, value);
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify(key, value) {
        this.listeners.forEach(listener => listener(key, value, this.data));
    }
}

export const state = new State();
