
class Exception {

    constructor(message) {
        if (!message) {
            message = "Not yet implemented";
        }
        this.message = message;
        this.name = "Exception";
    }
}


class TemplateNotFound extends Exception {
    constructor(message: string) {
        super(message);
        this.name = 'TemplateNotFound';
    }
}

class NotImplemented extends Exception {
    
    constructor(message) {
        super(message);
        this.name = "NotImplemented";
    }
}


class ValueError extends Exception {

    constructor(message) {
        super(message);
        this.name = 'ValueError';
    }
}

export { TemplateNotFound, ValueError, NotImplemented };