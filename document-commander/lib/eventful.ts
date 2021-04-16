type CallbackFunc = (...args: any) => any;


type EventRecord = {
    callback: CallbackFunc;
    context: any;
}

class Eventful {
    _events: Record<string, Array<EventRecord>> = {};

    on(name: string, callback: CallbackFunc, context?: any): void {

        if (!this._events) {
            this._events = {};
        }

        if (this._events[name] == undefined) {
            this._events[name] = [];
        };

        if (!context) {
            context = this;
        }

        if (Array.isArray(this._events[name])) {
            this._events[name].push({
                callback: callback,
                context: context,
            });
        }
    }

    trigger(name: string, ...args: any): void {
        let handlers,
            callback,
            context;

        handlers = this._events[name];
        if (Array.isArray(handlers)) {
            for (let i=0; i < handlers.length; i++) {
                callback = handlers[i].callback;
                context = handlers[i].context;
                callback.apply(context, args);
            }
        } 
    }
}

export { Eventful };