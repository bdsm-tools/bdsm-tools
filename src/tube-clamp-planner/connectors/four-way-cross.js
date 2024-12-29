import { registerTypeDefinition } from './types';
import FourWayCross from '../nodes/FourWayCross';
import FourWayCrossEditor from '../editor/FourWayCrossEditor';

export default registerTypeDefinition({
  type: '4-way-cross',
  endConnections: 4,
  middleConnections: 1,
  hasSurfaceConnection: false,
  name: '4 Way Cross',
  Node: FourWayCross,
  Editor: FourWayCrossEditor,
});
