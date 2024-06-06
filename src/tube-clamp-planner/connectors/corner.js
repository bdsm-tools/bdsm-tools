import Corner from "../nodes/Corner";
import {registerTypeDefinition} from "./types";

export default registerTypeDefinition({
    type: 'corner',
    endConnections: 2,
    middleConnections: 0,
    surfaceConnections: 0,
    name: 'Corner',
    Node: Corner,
})
