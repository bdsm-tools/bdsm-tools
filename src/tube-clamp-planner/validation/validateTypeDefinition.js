import validateTube from "./validateTube";

export default function validateTypeDefinition(typeDefinition, { surface, middleConnections = [], endConnections = [] }, joinedFrom) {
    const { type } = typeDefinition;

    if (!typeDefinition.hasSurfaceConnection && !!surface) {
        throw `Type '${type}' cannot connect to a surface`;
    }

    const fromMiddle = joinedFrom === 'middle' ? 1 : 0;
    if ((typeDefinition.middleConnections - fromMiddle) < middleConnections.length) {
        throw `Type '${type}' can only connect to ${typeDefinition.middleConnections} middle connections`;
    }

    const fromEnd = joinedFrom === 'end' ? 1 : 0;
    if ((typeDefinition.endConnections - fromEnd) < endConnections.length) {
        throw `Type '${type}' can only connect to ${typeDefinition.endConnections} end connections`;
    }

    middleConnections?.forEach((connection) => validateTube(
        connection,
        'middle',
    ));

    endConnections?.forEach((connection) => validateTube(
        connection,
        'end'
    ));
}