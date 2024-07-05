import Corner from '../nodes/Corner';
import { registerTypeDefinition } from './types';
import CornerEditor from '../editor/CornerEditor';

export default registerTypeDefinition({
  type: 'corner',
  endConnections: 2,
  middleConnections: 0,
  hasSurfaceConnection: false,
  name: 'Corner',
  Node: Corner,
  Editor: CornerEditor,
});
