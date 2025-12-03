import React from 'react';
import { BufferGeometryLoader } from 'three';
import { Geometry } from '@react-three/csg';
import { downloadJSON } from '../../util';
import { useDebounceEffect } from 'ahooks';

export const cacheOptions = {
  enabled: true,
  createPregen: false,
};

const geometryLoader = new BufferGeometryLoader();

export default function CacheGeometry({ ref: fref, cacheKey, dev, ...props }) {
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
        setGeometry(null);
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
    [ref?.current, id],
    { wait: 1000, maxWait: 2000 },
  );

  if (!loadedPregen) {
    return null;
  }

  if (!cacheOptions.enabled || dev || !geometry) {
    return <Geometry {...props} ref={ref} />;
  }

  return <bufferGeometry ref={fref} {...geometry} />;
}
