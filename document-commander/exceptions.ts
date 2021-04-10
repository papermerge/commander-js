
class Exception {

    message: string
    name: string

    constructor(message: string) {
        this.message = message;
    }
}


class TemplateNotFound extends Exception {
    message: string

    constructor(message: string) {
        super(message);
        this.name = 'TemplateNotFound';
    }
}


class ValueError extends Exception {

    constructor(message: string) {
        super(message);
        this.name = 'ValueError';
    }
}

export { TemplateNotFound, ValueError };