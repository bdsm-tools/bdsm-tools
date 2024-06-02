import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export default create(immer(set => ({
  selectedNodeId: undefined,

  setSelectedNode: (selectedNodeId) => set({ selectedNodeId }),
})));