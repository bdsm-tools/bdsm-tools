import React from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useInterval, useLocalStorageState, useThrottleFn } from 'ahooks';
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
        state.scene = {
          ...state.scene,
          ...data,
        };
      }),

    importChains: (...inputChains) =>
      set({
        chains: inputChains.map(importChain),
      }),

    addChainNode: (node) =>
      set((state) => {
        if (!node.id) {
          node.id = uuidv4();
        }
        const chain = state.chains.find((chain) => chain[node.parent]);
        chain[node.id] = node;
        chain[node.parent].children[node.parentSlot].push(node.id);
      }),
    setChainNode: (id, node) =>
      set((state) => {
        const chain = state.chains.find((chain) => chain[id]);

        chain[id].node = {
          ...chain[id].node,
          ...node,
        };
      }),
    addChain: (chain) =>
      set((state) => {
        state.chains = [...state.chains, importChain(chain)];
      }),

    setCanvasData: (data = {}) =>
      set((state) => {
        state.canvasData = {
          ...state.canvasData,
          ...data,
        };
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
    if (store.scene.id === sceneId) {
      setLocalScene({
        ...store.scene,
        version: 1,
        chains: store.chains.map((chain) => exportChain(chain)),
      });
    }
  };

  React.useEffect(() => {
    if (sceneId === '__dev__') {
      setLocalScene(testScene);
      store.setScene(testScene);
      store.importChains(...testScene.chains);
    } else if (scene) {
      store.setScene(scene);
      store.importChains(...scene.chains);
    }

    return () => {
      saveToLocalStorage();
      store.setScene({});
      store.importChains();
      store.setCanvasData({});
    };
  }, [sceneId, !scene]);

  useInterval(saveToLocalStorage, 5000, { immediate: false });
};

export default function useSceneStore() {
  const store = useStore();
  const { run: setScene, flush: flushSetScene } = useThrottleFn(
    store.setScene,
    { wait: 50 },
  );
  const { run: setChainNodeThrottled, flush: flushSetChain } = useThrottleFn(
    store.setChainNode,
    { wait: 50 },
  );

  React.useEffect(
    () => () => {
      flushSetScene();
      flushSetChain();
    },
    [],
  );

  return {
    ...store,

    setScene,
    getNode: (id) => store.chains.find((chain) => !!chain[id])?.[id],
    setChainNode: (id) => (node) => setChainNodeThrottled(id, node),
  };
}
