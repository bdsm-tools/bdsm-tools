import React from 'react';
import { Descriptions, InputNumber } from 'antd';
import useSceneStore from '../state/useSceneStore';

const surfaceSizes = {
  'side-wall': (scene) => ({ x: scene.length, y: scene.height }),
  'side-wall2': (scene) => ({ x: scene.length, y: scene.height }),
  'back-wall': (scene) => ({ x: scene.width, y: scene.height }),
  'back-wall2': (scene) => ({ x: scene.width, y: scene.height }),
  floor: (scene) => ({ x: scene.width, y: scene.length }),
};

export default function SurfaceEditorInput({
  node,
  setNode,
  surfaceId,
  autoFocus = false,
}) {
  const { scene } = useSceneStore();
  const surfaceSize = surfaceSizes[surfaceId](scene);

  const coords = node?.surface?.coords || [0, 0, 1];

  React.useEffect(() => {
    if (coords[2]) {
      setNode({
        surface: {
          type: surfaceId,
          coords: [
            Math.round(surfaceSize.x / 2),
            Math.round(surfaceSize.y / 2),
          ],
        },
      });
    }
  }, [node?.surface?.coords]);

  return (
    <Descriptions
      title='Surface Position'
      layout='vertical'
      size='small'
      column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
    >
      <Descriptions.Item label='Right'>
        <InputNumber
          addonAfter='cm'
          controls
          size='small'
          autoFocus={autoFocus}
          min={0}
          max={surfaceSize.x}
          value={coords[0]}
          onChange={(value) =>
            setNode({
              surface: {
                type: surfaceId,
                coords: [value, coords[1]],
              },
            })
          }
        />
      </Descriptions.Item>
      <Descriptions.Item label={surfaceId === 'floor' ? 'Down' : 'Up'}>
        <InputNumber
          addonAfter='cm'
          controls
          size='small'
          min={0}
          max={surfaceSize.y}
          value={coords[1]}
          onChange={(value) =>
            setNode({
              surface: {
                type: surfaceId,
                coords: [coords[0], value],
              },
            })
          }
        />
      </Descriptions.Item>
    </Descriptions>
  );
}
