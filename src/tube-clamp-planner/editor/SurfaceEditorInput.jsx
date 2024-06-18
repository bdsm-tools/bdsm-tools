import React from 'react';
import { InputNumber, Typography } from 'antd'
import useSceneStore from '../state/useSceneStore'

const surfaceSizes = {
  'side-wall': (scene) => ({ x: scene.length, y: scene.height }),
  'side-wall2': (scene) => ({ x: scene.length, y: scene.height }),
  'back-wall': (scene) => ({ x: scene.width, y: scene.height }),
  'back-wall2': (scene) => ({ x: scene.width, y: scene.height }),
  'floor': (scene) => ({ x: scene.width, y: scene.length }),
};

export default function SurfaceEditorInput({ node, setNode, surfaceId }) {
  const { scene } = useSceneStore();
  const surfaceSize = surfaceSizes[surfaceId](scene);

  const coords = node?.surface?.coords || [0, 0, 1];

  React.useEffect(() => {
    if (!!coords[2]) {
      setNode({
        surface: {
          type: surfaceId,
          coords: [Math.round(surfaceSize.x / 2), Math.round(surfaceSize.y / 2)],
        }
      });
    }
  }, [node?.surface?.coords]);

  return (
    <>
      <Typography>
        Right:
      </Typography>
      <InputNumber
        addonAfter='cm'
        controls
        size='small'
        autoFocus
        min={0}
        max={surfaceSize.x}
        value={coords[0]}
        onChange={(value) => setNode({
          surface: {
            type: surfaceId,
            coords: [value, coords[1]],
          }
        })}
      />
      <Typography>
        {surfaceId === 'floor' ? 'Down:' : 'Up:'}
      </Typography>
      <InputNumber
        addonAfter='cm'
        controls
        size='small'
        autoFocus
        min={0}
        max={surfaceSize.y}
        value={coords[1]}
        onChange={(value) => setNode({
          surface: {
            type: surfaceId,
            coords: [coords[0], value],
          }
        })}
      />
    </>
  );
}
