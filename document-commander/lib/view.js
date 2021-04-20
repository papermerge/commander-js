import _ from "underscore";
import $ from "jquery";

import { Eventful } from "./eventful";
import { applyMixins } from "./utils";


class View {

    constructor(options={}) {
        this.options = options;
        this.cid = _.uniqueId('view');
        this.setElement(options['el']);
    }

    delegateEvents(events) {
        let method,
            match,
            _method;

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

    delegate(eventName, selector, listener) {
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

    setElement(element) {
        this.undelegateEvents();
        this._setElement(element);
        this.delegateEvents();
        return this;
    }

    _setElement(el) {
        if (el instanceof $) {
            this.$el = el;
        } else {
            this.$el = $(el);
        }
        this.el = this.$el[0];
    }
}

applyMixins(View, [Eventful]);

export { View };