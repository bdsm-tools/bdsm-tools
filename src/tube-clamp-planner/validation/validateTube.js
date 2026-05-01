import validateTypeDefinition from './validateTypeDefinition';
import { getTypeDefinition } from '../connectors/types';

export default function validateTube(tube, joinFrom) {
  if (!tube) {
    // Nulls are acceptable because they're used as placeholders to prevent indexes from changing
    return;
  }

  if (tube.type !== 'tube') {
    throw `Expected tube, but got type '${tube.type}'`;
  }

  if (tube.endConnections?.filter(Boolean)?.length > 1 && joinFrom === 'end') {
    throw 'You cannot have 2 "endConnections" on a tube that is already being joined using an end.';
  }

  tube.middleConnections
    ?.filter(Boolean)
    ?.forEach((connection) =>
      validateTypeDefinition(
        getTypeDefinition(connection.type),
        connection,
        'middle',
      ),
    );

  tube.endConnections
    ?.filter(Boolean)
    ?.forEach((connection) =>
      validateTypeDefinition(
        getTypeDefinition(connection.type),
        connection,
        'end',
      ),
    );
}
