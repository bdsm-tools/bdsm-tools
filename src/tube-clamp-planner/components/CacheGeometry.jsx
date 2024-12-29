import React from 'react';
import { BufferGeometryLoader } from 'three';
import { Geometry } from '@react-three/csg';
import geometryCachePregen from '../data/connector-geometry.pregen.json';

export const cacheOptions = {
  enabled: true,
};

export let geometryCache = {
  ...geometryCachePregen,
};
const geometryLoader = new BufferGeometryLoader();

const CacheGeometry = React.forwardRef(({ cacheKey, ...props }, fref) => {
  const ref = React.useRef(fref);
  const id = cacheKey.join('-').concat(':v1');

  React.useEffect(() => {
    if (!geometryCache[id] && ref?.current?.geometry?.isBufferGeometry) {
      geometryCache[id] = ref.current.geometry.toJSON();
    }
  }, [ref?.current]);

  if (!cacheOptions.enabled || !geometryCache[id]) {
    return <Geometry {...props} ref={ref} />;
  }

  return <bufferGeometry {...geometryLoader.parse(geometryCache[id])} />;
});

export default CacheGeometry;
