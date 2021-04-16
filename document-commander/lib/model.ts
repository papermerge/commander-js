import { Events } from "./events";
import { applyMixins } from "./utils";

class Model {
}

interface Model extends Events {};

applyMixins(Model, [Events]);

export { Model };