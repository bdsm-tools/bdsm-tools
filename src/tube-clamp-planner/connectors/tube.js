import Tube from '../nodes/Tube';
import TubeEditor from '../editor/TubeEditor';
import { registerTypeDefinition } from './types';

export default registerTypeDefinition({
  type: 'tube',
  endConnections: 2,
  middleConnections: '∞',
  hasSurfaceConnection: false,
  name: 'Tube',
  Node: Tube,
  Editor: TubeEditor,
});
