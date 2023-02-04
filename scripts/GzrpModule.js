import NUICallbackHandler from 'NUICallbackHandler';

export default class GzrpModule {
    constructor() {
        this.ingame = true;
        this.$body = document.querySelector('body');
        this.NUICallbackHandler = new NUICallbackHandler();

        if (location.hostname === "localhost") {
            this.ingame = false;
            this.$body.classList.add('development');
        }
    }
    activateModule() {
        this.$body.classList.add('is-active');
    }
    deactivateModule() {
        this.$body.classList.remove('is-active');
    }
}