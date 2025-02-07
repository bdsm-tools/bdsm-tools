import { registerTypeDefinition } from './types';
import DoubleLuggedBracket from '../nodes/DoubleLuggedBracket';
import DoubleLuggedBracketEditor from '../editor/DoubleLuggedBracketEditor';

export default registerTypeDefinition({
  type: 'double-lugged-bracket',
  endConnections: 0,
  middleConnections: 1,
  hasSurfaceConnection: false,
  name: 'Double Lugged Bracket',
  Node: DoubleLuggedBracket,
  Editor: DoubleLuggedBracketEditor,
});
