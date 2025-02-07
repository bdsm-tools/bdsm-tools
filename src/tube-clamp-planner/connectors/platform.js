import Platform from '../nodes/Platform';
import { registerTypeDefinition } from './types';
import PlatformEditor from '../editor/PlatformEditor';

export default registerTypeDefinition({
  type: 'platform',
  endConnections: 0,
  middleConnections: 1,
  hasSurfaceConnection: false,
  name: 'Platform',
  Node: Platform,
  Editor: PlatformEditor,
});
