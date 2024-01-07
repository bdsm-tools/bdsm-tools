import Crossover from "../nodes/Crossover";
import {registerTypeDefinition} from "./types";
import CrossoverEditor from '../editor/CrossoverEditor'

export default registerTypeDefinition({
    type: 'crossover',
    endConnections: 0,
    middleConnections: 2,
    surfaceConnections: 0,
    name: 'Crossover',
    Node: Crossover,
    Editor: CrossoverEditor,
})
