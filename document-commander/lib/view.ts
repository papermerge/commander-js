import _ from "underscore";

type Func = (...args: any) => any;
type TElement = JQuery<HTMLElement> | HTMLElement | string;


class View {

    [key: string]: any; // i.e. we can index e.g. this["method"]

    $el: any
    el: any
    cid: string
    options: Record<string, any>;

    constructor(options: Record<string, any>) {
        this.options = options;
        this.cid = _.uniqueId('view');
    }

    delegateEvents(events?: Record<string, any>) {
        let method: string,
            match,
            _method: any;

        events || (events = _.result(this, 'events'));
        if (!events) {
            return this;
        }
        this.undelegateEvents();
        
        for (let key in events) {
            method = events[key];
            if (!_.isFunction(method)) {
                _method = this[method];
            }
            if (!method) {
                continue;
            }
            match = key.match(/^(\S+)\s*(.*)$/);
            this.delegate(match[1], match[2], _method.bind(this));
        }
        return this;
    }

    delegate(eventName: string, selector:string, listener: Func) {
        this.$el.on(
            eventName + '.delegateEvents' + this.cid,
            selector,
            listener
        );
        return this;
    }

    undelegateEvents() {
        if (this.$el) {
            this.$el.off('.delegateEvents' + this.cid);
        }
        return this;
    }

    setElement(element: any) {
        this.undelegateEvents();
        this._setElement(element);
        this.delegateEvents();
        return this;
    }

    _setElement(el: any) {
        if (el instanceof $) {
            this.$el = el;
        } else {
            this.$el = $(el);
        }
        this.el = this.$el[0];
    }
}


export { View };