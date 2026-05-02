import validateTube from './validateTube';

export default function validateTypeDefinition(
  typeDefinition,
  { surface, middleConnections = [], endConnections = [] },
  joinedFrom,
) {
  const { type } = typeDefinition;

  if (!typeDefinition.hasSurfaceConnection && !!surface) {
    throw `Type '${type}' cannot connect to a surface`;
  }

  const fromMiddle = joinedFrom === 'middle' ? 1 : 0;
  if (
    typeDefinition.middleConnections - fromMiddle <
    middleConnections?.filter(Boolean).length
  ) {
    throw `Type '${type}' can only connect to ${typeDefinition.middleConnections} middle connections`;
  }

  const fromEnd = joinedFrom === 'end' ? 1 : 0;
  if (
    typeDefinition.endConnections - fromEnd <
    endConnections?.filter(Boolean).length
  ) {
    throw `Type '${type}' can only connect to ${typeDefinition.endConnections} end connections`;
  }

  middleConnections
    ?.filter(Boolean)
    ?.forEach((connection) => validateTube(connection, 'middle'));

  endConnections
    ?.filter(Boolean)
    ?.forEach((connection) => validateTube(connection, 'end'));
}
