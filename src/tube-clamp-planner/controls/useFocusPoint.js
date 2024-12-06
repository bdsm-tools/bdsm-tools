import React from 'react';
import { Box3, Vector3 } from 'three';
import useSelectionStore from '../state/useSelectionStore';

export default function useFocusPoint() {
  const [focusPoint, setFocusPoint] = React.useState(new Vector3(50, 0, 0));

  const { selection } = useSelectionStore();

  React.useEffect(() => {
    if (selection) {
      setFocusPoint(
        new Box3().setFromObject(selection).getCenter(new Vector3()),
      );
    }
  }, [selection]);

  return [focusPoint, setFocusPoint];
}
