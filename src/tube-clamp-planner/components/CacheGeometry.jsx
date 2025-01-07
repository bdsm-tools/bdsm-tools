import React from 'react';
import { BufferGeometryLoader } from 'three';
import { Geometry } from '@react-three/csg';
import geometryCachePregen from '../data/connector-geometry.pregen.json';
import { downloadJSON } from '../../util';
import { useDebounceEffect } from 'ahooks';

export const cacheOptions = {
  enabled: true,
  createPregen: false,
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

  return (
    <bufferGeometry ref={fref} {...geometryLoader.parse(geometryCache[id])} />
  );
});

const CacheGeometryV2 = React.forwardRef(({ cacheKey, ...props }, fref) => {
  const ref = React.useRef(fref);
  const id = cacheKey.join('-').concat('_v1');
  const [geometry, setGeometry] = React.useState();
  const [loadedPregen, setLoadedPregen] = React.useState(false);

  React.useEffect(() => {
    setLoadedPregen(false);
    import(`../data/connector-geometry/${id}.pregen.json`)
      .then((data) => {
        // Object.assign(geometryCache, { id: data });
        setGeometry(geometryLoader.parse(data));
        setLoadedPregen(true);
      })
      .catch((e) => {
        console.error(e);
        setLoadedPregen(true);
      });
  }, [id]);

  useDebounceEffect(
    () => {
      if (!geometry && ref?.current?.geometry?.isBufferGeometry) {
        const json = ref.current.geometry.toJSON();

        if (cacheOptions.createPregen) {
          downloadJSON(json, `${id}.pregen.json`);
        }

        setGeometry(geometryLoader.parse(json));
      }
    },
    [ref?.current],
    { wait: 1000, maxWait: 2000 },
  );

  if (!loadedPregen) {
    return null;
  }

  if (!cacheOptions.enabled || !geometry) {
    return <Geometry {...props} ref={ref} />;
  }

  return <bufferGeometry ref={fref} {...geometry} />;
});

export default CacheGeometryV2;
