import Flange from '../nodes/Flange';
import { registerTypeDefinition } from './types';
import FlangeEditor from '../editor/FlangeEditor';

export default registerTypeDefinition({
  type: 'flange',
  endConnections: 1,
  middleConnections: 0,
  hasSurfaceConnection: true,
  name: 'Flange',
  Node: Flange,
  Editor: FlangeEditor,
});
