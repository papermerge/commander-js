
type CallbackFunc = (...args: any) => any;

type EventRecord = {
    callback: CallbackFunc;
    context: any;
}

class Events {
    /**
     * Events is a class that can be "mixed" in any model/class.
     * On any class instance which inherits from `Events` you can trigger events.
     * Example:
     * 
     * class Model extends Events {
     *    attr1;
     *    attr2;
     *    ...
     * } 
     * 
     * let model = new Model();
     * 
     * model.on("change", function() {console.log("Model changed")});
     *
     * ... somewhere in code
     * model.trigger("change")
     * // will print to consle ("Model changed"); 
    */

    _events: Record<string, Array<EventRecord>> = {};

    on(name: string, callback: CallbackFunc, context?: any): void {
        let handlers;

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
    };

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
    };
}

export { Events };