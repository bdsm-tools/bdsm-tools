import React from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useInterval, useLocalStorageState } from 'ahooks';
import { v4 as uuidv4 } from 'uuid';
import { exportChain, importChain } from '../data/chain';
import testScene from '../data/testScene';

const useStore = create(
  immer((set) => ({
    scene: {},
    chains: [],
    canvasData: {},

    setScene: (data = {}) =>
      set((state) => {
        Object.assign(state.scene, data);
      }),

    resetScene: (data = {}) => set({ scene: data }),

    importChains: (...inputChains) =>
      set({
        chains: inputChains.filter(Boolean).map(importChain),
      }),

    addChainNode: (node, index = -1) =>
      set((state) => {
        if (!node.id) {
          node.id = uuidv4();
        }
        const chain = state.chains.find((chain) => chain[node.parent]);
        chain[node.id] = node;
        if (index < 0) {
          const indexOfUndefined =
            chain[node.parent].children[node.parentSlot].indexOf(undefined);
          if (indexOfUndefined < 0) {
            chain[node.parent].children[node.parentSlot].push(node.id);
          } else {
            chain[node.parent].children[node.parentSlot].splice(
              indexOfUndefined,
              1,
              node.id,
            );
          }
        } else {
          chain[node.parent].children[node.parentSlot].length = Math.max(
            chain[node.parent].children[node.parentSlot].length,
            index + 1,
          );
          chain[node.parent].children[node.parentSlot].splice(
            index,
            1,
            node.id,
          );
        }

        console.log(chain[node.parent]);
      }),
    setChainNode: (id, node) =>
      set((state) => {
        const chain = state.chains.find((chain) => chain[id]);

        Object.assign(chain[id].node, node);
      }),
    removeChainNode: (id) =>
      set((state) => {
        const chainIndex = state.chains.findIndex((chain) => chain[id]);
        const chain = state.chains[chainIndex];

        Object.keys(chain).forEach((key) => {
          const middleIndex = chain[key].children.middle.indexOf(id);
          if (middleIndex !== -1) {
            chain[key].children.middle.splice(middleIndex, 1, undefined);
          }
          const endIndex = chain[key].children.end.indexOf(id);
          if (endIndex !== -1) {
            chain[key].children.end.splice(endIndex, 1, undefined);
          }
        });
        delete chain[id];

        if (Object.keys(chain).length === 0) {
          state.chains.splice(chainIndex, 1, undefined);
        }
      }),
    addChain: (chain) =>
      set((state) => {
        state.chains = [...state.chains, importChain(chain)];
      }),

    setCanvasData: (data = {}) =>
      set((state) => {
        Object.assign(state.canvasData, data);
      }),

    resetCanvasData: () => set({ canvasData: {} }),

    setSettings: (data = {}) =>
      set((state) => {
        Object.assign(state.settings, data);
      }),
  })),
);

export const useInitScene = (sceneId) => {
  const store = useSceneStore();

  const [scene, setLocalScene] = useLocalStorageState(`tube-plan-${sceneId}`, {
    listenStorageChange: false,
    defaultValue: undefined,
  });

  const saveToLocalStorage = () => {
    const data = useStore.getState();
    if (data.scene.id === sceneId) {
      setLocalScene({
        ...JSON.parse(JSON.stringify(data.scene)),
        version: 1,
        chains: data.chains.filter(Boolean).map((chain) => exportChain(chain)),
      });
    }
  };

  React.useEffect(() => {
    if (sceneId === '__dev__') {
      setLocalScene(testScene);
      store.resetScene(testScene);
      store.importChains(...testScene.chains);
    } else if (scene) {
      store.resetScene(scene);
      store.importChains(...scene.chains);
    }
    store.resetCanvasData();

    return () => {
      saveToLocalStorage();
      store.resetScene();
      store.importChains();
      store.resetCanvasData();
    };
  }, [sceneId, !scene]);

  useInterval(saveToLocalStorage, 5000, { immediate: false });
};

export default function useSceneStore() {
  const store = useStore();

  return {
    ...store,

    getNode: (id) => store.chains.find((chain) => !!chain[id])?.[id],
    setChainNode: (id) => (node) => store.setChainNode(id, node),
  };
}
