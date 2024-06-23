import validateTypeDefinition from './validateTypeDefinition';
import { getTypeDefinition } from '../connectors/types';

export default function validateTube(tube, joinFrom) {
  if (tube.type !== 'tube') {
    throw `Expected tube, but got type '${tube.type}'`;
  }

  if (tube.startConnection && joinFrom === 'end') {
    throw (
      'You cannot have a "startConnection" on a tube that is already being join using an end.' +
      'Use "endConnection" if free instead.'
    );
  }

  tube.middleConnections?.forEach((connection) =>
    validateTypeDefinition(
      getTypeDefinition(connection.type),
      connection,
      'middle',
    ),
  );

  if (tube.endConnection) {
    validateTypeDefinition(
      getTypeDefinition(tube.endConnection.type),
      tube.endConnection,
      'end',
    );
  }
}
