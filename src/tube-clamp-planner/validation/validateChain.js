import validateTypeDefinition from "./validateTypeDefinition";
import {getTypeDefinition} from "../connectors/types";

export default function validateChain(chain) {
    if (Array.isArray(chain)) {
        chain.forEach((o) => validateChain(o));
        return;
    }

    const { type, surfaceConnections } = chain;

    if (!surfaceConnections || surfaceConnections.length < 1) {
        throw 'Chain start must connect to at least one surface';
    }

    const typeDefinition = getTypeDefinition(type);
    if (typeDefinition.surfaceConnections < 1) {
        throw `The chain start '${type}' is not able to connect to a surface`;
    }

    validateTypeDefinition(typeDefinition, chain, 'surface');
}