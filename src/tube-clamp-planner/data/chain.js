import { v4 as uuid } from 'uuid';
import validateChain from '../validation/validateChain';

export function exportChain(normalisedChain) {
  const entryChain = Object.values(normalisedChain).find(
    (value) => !value.parent,
  );

  function chainNode(node) {
    const chain = {
      ...node.node,
      middleConnections: node.children.middle.map((id) =>
        id ? chainNode(normalisedChain[id]) : undefined,
      ),
      endConnections: node.children.end.map((id) =>
        id ? chainNode(normalisedChain[id]) : undefined,
      ),
    };

    if (chain.middleConnections.length < 1) delete chain.middleConnections;
    if (chain.endConnections.length < 1) delete chain.endConnections;

    return chain;
  }

  return chainNode(entryChain);
}

export function importChain(chain) {
  validateChain(chain);

  const chainMap = {};

  function chainNode(node, parent = undefined, parentSlot = undefined) {
    const id = uuid();
    const nodeCopy = { ...node };
    delete nodeCopy.middleConnections;
    delete nodeCopy.endConnections;

    chainMap[id] = {
      id,
      node: nodeCopy,
      parent,
      parentSlot,
      children: {
        middle:
          node?.middleConnections?.map((e) => e ? chainNode(e, id, 'middle') : undefined) || [],
        end: node?.endConnections?.map((e) => e ? chainNode(e, id, 'end') : undefined) || [],
      },
    };

    return id;
  }

  chainNode(chain);
  return chainMap;
}
