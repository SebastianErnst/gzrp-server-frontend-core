export default class ErrorMessageHelper {
    number() {
        return `Feld darf keine Nummern enthalten.`;
    }
    minLength(minlength) {
        return `Feld muss mindestens ${minlength} Zeichen lang sein.`;
    }

    maxLength(maxLength) {
        return `Feld darf maximal ${maxLength} Zeichen lang sein.`;
    }

    specialChars() {
        return `Feld darf keine Sonderzeichen enthalten.`;
    }

    whitespace() {
        return `Feld darf keine Leerzeichen enthalten.`;
    }

    minValue(minValue) {
        return `Wert des Feldes muss mindestens ${minValue} sein.`;
    }

    maxValue(maxValue) {
        return `Wert des Feldes darf maximal ${maxValue} sein.`;
    }

    minDate(minDate) {
        return `Datum muss nach ${minDate.toLocaleDateString('de-DE')} liegen.`;
    }

    maxDate(maxDate) {
        return `Datum muss vor ${maxDate.toLocaleDateString('de-DE')} liegen.`;
    }

    selectEmpty() {
        return `Auswahl muss getroffen werden.`;
    }

    invalidDate() {
        return `Auswahl muss getroffen werden.`;
    }
}