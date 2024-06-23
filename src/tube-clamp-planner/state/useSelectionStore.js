import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useSelectionStore = create(
  immer((set) => ({
    selection: undefined,
    selectedNodeId: undefined,
    previousSelectedNodeId: undefined,

    setSelectedNode: (_selected) =>
      set((state) => {
        state.selection = _selected;
        state.selectedNodeId = _selected?.userData?.id;
        state.previousSelectedNodeId = state.selectedNodeId;
      }),
  })),
);

export default useSelectionStore;
