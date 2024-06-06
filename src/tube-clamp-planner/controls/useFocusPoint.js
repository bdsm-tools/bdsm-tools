import React from 'react'
import { Box3, Vector3 } from 'three'
import { useSelect } from '@react-three/drei'

export default function useFocusPoint () {
  const [focusPoint, setFocusPoint] = React.useState(new Vector3(50, 0, 0));

  const [selection, ...others] = useSelect();

  React.useEffect(() => {
    if (selection) {
      setFocusPoint(new Box3().setFromObject(selection).getCenter(new Vector3()));
    }
    console.log(selection)
  }, [selection]);

  return [focusPoint, setFocusPoint];
}