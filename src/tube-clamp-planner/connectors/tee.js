import Tee from "../nodes/Tee";
import {registerTypeDefinition} from "./types";

export default registerTypeDefinition({
    type: 'tee',
    endConnections: 1,
    middleConnections: 1,
    surfaceConnections: 0,
    name: 'Tee',
    Node: Tee,
})
