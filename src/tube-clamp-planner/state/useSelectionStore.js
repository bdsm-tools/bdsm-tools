import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export default create(immer(set => ({
  selectedNodeId: undefined,

  setSelectedNode: (_selectedNodeId) => set((state) => {
    state.selectedNodeId = _selectedNodeId;
  }),
})));