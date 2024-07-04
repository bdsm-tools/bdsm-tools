import React from 'react';
import { Select, useSelect } from '@react-three/drei';
import { Object3D } from 'three';
import useSelectionStore from '../state/useSelectionStore';

const StoreSetter = () => {
  const { setSelectedNode } = useSelectionStore();
  const [selected] = useSelect();

  React.useEffect(() => {
    setSelectedNode(selected);
  }, [selected]);
  return null;
};

const SelectionWrapper = React.forwardRef(({ children }, ref) => {
  const getSelectable = (s) =>
    !s || !(s instanceof Object3D)
      ? undefined
      : s?.userData?.selectable
        ? s
        : getSelectable(s.parent);
  const filter = (s) =>
    s
      .map(getSelectable)
      .filter((selectable) => !!selectable)
      .filter((selectable) => {
        if (selectable?.userData?.requiresNothingSelected) {
          return !useSelectionStore.getState().selectedNodeId;
        }
        return true;
      });

  const selectionStore = useSelectionStore();

  React.useEffect(() => () => {
    selectionStore.setSelectedNode(undefined);
    selectionStore.setSelectedNode(undefined);
  }, []);

  return (
    <Select ref={ref} filter={filter}>
      <StoreSetter />
      {children}
    </Select>
  );
});

export default SelectionWrapper;
