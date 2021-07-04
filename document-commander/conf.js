import { settings as orig_settings } from "@papermerge/symposium";


let settings = new Map(orig_settings);

settings.set("csrf-header", "X-CSRFToken");
// a DOM selector to retrieve csrf middleware token
settings.set("csrf-selector", "[name=csrfmiddlewaretoken]");

export { settings };