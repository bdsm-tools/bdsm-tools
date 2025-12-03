import Tee90 from '../nodes/Tee90';
import { registerTypeDefinition } from './types';
import Tee90Editor from '../editor/Tee90Editor';

export default registerTypeDefinition({
  type: 'tee',
  endConnections: 1,
  middleConnections: 1,
  hasSurfaceConnection: false,
  name: 'Tee',
  Node: Tee90,
  Editor: Tee90Editor,
});
