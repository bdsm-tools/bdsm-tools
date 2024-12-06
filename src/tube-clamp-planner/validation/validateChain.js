import validateTypeDefinition from './validateTypeDefinition';
import { getTypeDefinition } from '../connectors/types';

export default function validateChain(chain) {
  if (Array.isArray(chain)) {
    chain.forEach((o) => validateChain(o));
    return;
  }

  const { type, surface } = chain;

  if (!surface || !surface.type || !surface.coords) {
    throw 'Chain start must connect to at least one surface';
  }

  const typeDefinition = getTypeDefinition(type);
  if (!typeDefinition.hasSurfaceConnection) {
    throw `The chain start '${type}' is not able to connect to a surface`;
  }

  validateTypeDefinition(typeDefinition, chain, 'surface');
}
