import HandrailBracket from '../nodes/HandrailBracket';
import { registerTypeDefinition } from './types';
import HandrailBracketEditor from '../editor/HandrailBracketEditor';

export default registerTypeDefinition({
  type: 'handrail-bracket',
  endConnections: 0,
  middleConnections: 1,
  hasSurfaceConnection: true,
  name: 'Handrail Bracket',
  Node: HandrailBracket,
  Editor: HandrailBracketEditor,
});
