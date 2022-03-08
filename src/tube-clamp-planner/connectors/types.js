const types = {};

export default types;

export const registerTypeDefinition = (typeDefinition) => {
    types[typeDefinition.type] = typeDefinition;
    return typeDefinition;
};

export const getTypeDefinition = (type) => {
    if (types[type]) {
        return types[type];
    }
    throw `Unknown type '${type}'`;
};
