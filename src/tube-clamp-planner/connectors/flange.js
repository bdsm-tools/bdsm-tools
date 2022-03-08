import Flange from "../nodes/Flange";
import {registerTypeDefinition} from "./types";

export default registerTypeDefinition({
    type: 'flange',
    endConnections: 1,
    middleConnections: 0,
    surfaceConnections: 1,
    Node: Flange,
})
