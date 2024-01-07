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

export const getTypeDefinitionsAsOptions = (filterFn = () => true) => Object.values(types).filter(filterFn).map((def) => ({
    label: def.name,
    value: def.type,
}));
