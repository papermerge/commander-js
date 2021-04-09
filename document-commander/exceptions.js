
class Exception {
    constructor(message) {
        this.message = message;
    }
}


class TemplateNotFound extends Exception {
    constructor(message) {
        super(message);
        this.name = 'TemplateNotFound';
    }
}


class ValueError extends Exception {
    constructor(message) {
        super(message);
        this.name = 'ValueError';
    }
}

export { TemplateNotFound, ValueError };