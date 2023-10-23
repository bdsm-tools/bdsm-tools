import React from 'react'
import { Vector3 } from 'three'
import { useSelect } from '@react-three/drei'

export default function useFocusPoint () {
  const [focusPoint, setFocusPoint] = React.useState(new Vector3(0, 0, 0));

  const [selection, ...others] = useSelect();

  React.useEffect(() => {
    if (selection) {
      setFocusPoint(selection.getWorldPosition(new Vector3()));
    }
  }, [selection]);

  return [focusPoint, setFocusPoint];
}