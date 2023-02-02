import NUICallbackHandler from 'NUICallbackHandler';

export default class GzrpModule {
    constructor() {
        this.ingame = true;
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