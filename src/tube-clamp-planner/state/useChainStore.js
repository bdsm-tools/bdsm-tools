import { create } from 'zustand';
import { importChain } from '../data/chain'
import { immer } from 'zustand/middleware/immer'
import { useThrottleFn } from 'ahooks'

const useStore = create(immer((set) => ({
  chains: [],

  importChains: (...inputChains) => set({
    chains: inputChains.map(importChain),
  }),

  addChainNode: (node) => set((state) => {
    const chain = state.chains.find(chain => chain[node.parent]);
    chain[node.id] = node;
    chain[node.parent].children[node.parentSlot].push(node.id);
  }),
  setChainNode: (id, node) => set((state) => {
    const chain = state.chains.find(chain => chain[id]);

    chain[id] = {
      ...chain[id],
      ...node,
    };
  }),
})));

export default function useChainStore() {
  const store = useStore();
  const { run: setChainNodeThrottled } = useThrottleFn(store.setChainNode, { wait: 50 });

  return {
    ...store,

    getNode: (id) => store.chains.find(chain => chain[id])[id],
    setChainNode: (id) => (node) => setChainNodeThrottled(id, node),
  };
}