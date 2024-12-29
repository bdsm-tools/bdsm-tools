import SingleMaleSwivel from '../nodes/SingleMaleSwivel';
import { registerTypeDefinition } from './types';
import SingleMaleSwivelEditor from '../editor/SingleMaleSwivelEditor';

export default registerTypeDefinition({
  type: 'single-male-swivel',
  endConnections: 0,
  middleConnections: 1,
  hasSurfaceConnection: false,
  name: 'Single Male Swivel',
  Node: SingleMaleSwivel,
  Editor: SingleMaleSwivelEditor,
});
