import Tee45 from '../nodes/Tee45';
import { registerTypeDefinition } from './types';
import Tee45Editor from '../editor/Tee45Editor';

export default registerTypeDefinition({
  type: 'tee-45',
  endConnections: 1,
  middleConnections: 1,
  hasSurfaceConnection: false,
  name: '45° Tee',
  Node: Tee45,
  Editor: Tee45Editor,
});
