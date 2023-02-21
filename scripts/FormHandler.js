import ErrorMessageHelper from "./ErrorMessageHelper";

export default class FormHandler {
    constructor(form, options) {
        this.$form = form;
        this.options = options;
        this.$inputs = this._getNodesFromOptions(options);
        this.onSuccessCallback = undefined;
        this.errorMessageHelper = new ErrorMessageHelper();

        this.$form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submit();
        })
    }

    submit() {
        let postData = {};
        let errors = {};

        Object.entries(this.options).forEach((option) => {
            const key = option[0];
            const $input = option[1].node
            const validationRules = option[1].validationRules;

            $input.value = $input.value.trim();

            let value = $input.value;

            errors[key] = [];
            if (typeof validationRules.minLength === 'number' && validationRules.minLength > 0) {
                errors[key].push(this._minLength(value, validationRules.minLength));
            }

            if (typeof validationRules.maxLength === 'number' && validationRules.maxLength > 0) {
                errors[key].push(this._maxLength(value, validationRules.maxLength));
            }

            if (typeof validationRules.specialChars === 'boolean' && validationRules.specialChars === false) {
                errors[key].push(this._specialChars(value));
            }

            if (typeof validationRules.whitespace === 'boolean' && validationRules.whitespace === false) {
                errors[key].push(this._whitespace(value));
            }

            if (typeof validationRules.number === 'boolean' && validationRules.number === false) {
                errors[key].push(this._number(value));
            }

            if (typeof validationRules.minValue === 'number' && validationRules.minValue > 0) {
                errors[key].push(this._minValue(value, validationRules.minValue));
            }

            if (typeof validationRules.maxValue === 'number' && validationRules.maxValue > 0) {
                errors[key].push(this._maxValue(value, validationRules.maxValue));
            }

            if (validationRules.minDate instanceof Date === true) {
                errors[key].push(this._minDate(value, validationRules.minDate));
            }

            if (validationRules.maxDate instanceof Date === true) {
                errors[key].push(this._maxDate(value, validationRules.maxDate));
            }

            if (validationRules.minDate instanceof Date === true || validationRules.maxDate instanceof Date === true) {
                errors[key].push(this._validDate(value));
            }

            if (typeof validationRules.selectEmpty === 'boolean' && validationRules.selectEmpty === false && this._selectEmpty(value, validationRules) !== '') {
                errors[key].push(this._selectEmpty(value, validationRules));
            }

            if ($input.getAttribute('type') === 'date') {
                const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
                value = new Date(value).toLocaleDateString('de-DE', options);
                value = value.replaceAll('.', '/');
            }

            errors[key] = errors[key].filter((value) => {
                return value !== '';
            }).join(' ');

            if (errors[key] === '') {
                delete errors[key];
                postData[key] = value;
            }
        });

        this._removeRenderedErrors();
        if (Object.keys(errors).length > 0) {
            this._renderErrors(errors);
        }

        if (Object.keys(errors).length === 0) {
            this.onSuccessCallback(postData);
        }
    }

    onSuccess(callback) {
        this.onSuccessCallback = callback;
    }

    _getNodesFromOptions(options) {
        let $nodes = {};
        Object.entries(options).forEach((option) => {
            const key = option[0];
            const $input = option[1].node
            $nodes[key] = $input;
        });

        return $nodes;
    }

    _renderErrors(errors) {
        Object.keys(errors).forEach((key) => {
            const errorMsg = errors[key];
            const $input = this.$form.querySelector(`#${key}`);
            const $errorLabel = document.createElement('span');
            $errorLabel.innerHTML = errorMsg;
            $errorLabel.classList.add('error-label');
            $input.after($errorLabel);
        });
    }

    _removeRenderedErrors() {
        Object.keys(this.$inputs).forEach((key) => {
            const $errorLabel = this.$form.querySelector(`#${key}`).nextSibling;
            if ($errorLabel !== null) {
                $errorLabel.remove();
            }
        });
    }

    _number(value) {
        const format = /\d/;
        if (format.test(value) === true) {
            return this.errorMessageHelper.number();
        }

        return '';
    }
    _validDate(value) {
        if (new Date(value) == 'Invalid Date') {
            return this.errorMessageHelper.invalidDate();
        }

        return '';
    }

    _minLength(value, minLength) {
        if (value.length < minLength) {
            return this.errorMessageHelper.minLength(minLength);
        }

        return '';
    }

    _maxLength(value, maxLength) {
        if (value.length > maxLength) {
            return this.errorMessageHelper.maxLength(maxLength);
        }

        return '';
    }

    _specialChars(value) {
        let format = /[!-\/:-@[-`{-~]/;
        if (format.test(value)) {
            return this.errorMessageHelper.specialChars();
        }
        format = /^[a-zA-Z]+$/;
        if (format.test(value) === false) {
            return this.errorMessageHelper.specialChars();
        }

        return '';
    }

    _whitespace(value) {
        const format = /^\S*$/;
        if (format.test(value) === false) {
            return this.errorMessageHelper.whitespace();
        }

        return '';
    }

    _minValue(value, minValue) {
        if (parseInt(value) < parseInt(minValue)) {
            return this.errorMessageHelper.minValue(minValue);
        }

        return '';
    }

    _maxValue(value, maxValue) {
        if (parseInt(value) > parseInt(maxValue)) {
            return this.errorMessageHelper.maxValue(maxValue);
        }

        return '';
    }

    _minDate(value, minDate) {
        if (new Date(value) < minDate) {
            return this.errorMessageHelper.minDate(minDate);
        }

        return '';
    }

    _maxDate(value, maxDate) {
        if (new Date(value) > maxDate) {
            return this.errorMessageHelper.maxDate(maxDate);
        }

        return '';
    }

    _selectEmpty(value) {
        if (value === '') {
            return this.errorMessageHelper.selectEmpty();
        }

        return '';
    }
}