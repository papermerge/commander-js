import { Eventful } from "./eventful";
import { applyMixins } from "./utils";

class Model {
}

interface Model extends Eventful {};

applyMixins(Model, [Eventful]);

export { Model };