import NUICallbackHandler from 'NUICallbackHandler';

export default class GzrpModule {
    constructor() {
        this.ingame = true;
        if (location.hostname === "localhost") {
            this.ingame = false;
        }
        this.$body = document.querySelector('body');
        this.NUICallbackHandler = new NUICallbackHandler();
    }
    activateModule() {
        this.$body.classList.add('is-active');
    }
    deactivateModule() {
        this.$body.classList.remove('is-active');
    }
}