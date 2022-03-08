import Crossover from "../nodes/Crossover";
import {registerTypeDefinition} from "./types";

export default registerTypeDefinition({
    type: 'crossover',
    endConnections: 0,
    middleConnections: 2,
    surfaceConnections: 0,
    Node: Crossover,
})
