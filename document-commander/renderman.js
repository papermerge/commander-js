import { Renderman } from "@papermerge/symposium";

import { templates_map } from "./templates/index";


let renderman = new Renderman(templates_map);

export { renderman };