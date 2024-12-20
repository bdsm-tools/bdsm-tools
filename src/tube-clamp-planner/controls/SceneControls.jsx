import React from 'react';
import { Button, Descriptions, Image, Input, InputNumber, Slider } from 'antd';
import useSceneStore from '../state/useSceneStore';
import ReactGA from 'react-ga4';
import { useDebounce, useDebounceFn } from 'ahooks';

const takeSnapshot = (canvas) =>
  (
    canvas ||
    document
      .getElementById('tube-planner-canvas')
      ?.getElementsByTagName('canvas')[0]
  )?.toDataURL('image/jpeg', 0.5);

export default function SceneControls({
  scene: propsScene,
  setScene: propsSetScene,
  basicOnly = false,
}) {
  const {
    scene: storeScene,
    setScene: storeSetScene,
    canvasData,
  } = useSceneStore();

  const scene = propsScene ?? storeScene;
  const setScene = propsSetScene ?? storeSetScene;

  return (
    <>
      <Input
        value={scene.title}
        onChange={({ target }) =>
          setScene({
            title: target.value,
          })
        }
        size='large'
        placeholder='Scene title'
      />
      <Input.TextArea
        value={scene.description || ''}
        onChange={({ target }) =>
          setScene({
            description: target.value,
          })
        }
        size='large'
        placeholder='Scene description'
        style={{ marginTop: 10 }}
      />
      <Descriptions
        title='Scene'
        layout='vertical'
        size='small'
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
        style={{ marginTop: 20 }}
      >
        <Descriptions.Item label='Length'>
          <InputNumber
            addonAfter='cm'
            controls
            size='small'
            value={scene.length}
            onChange={(value) =>
              setScene({
                length: value,
              })
            }
          />
        </Descriptions.Item>
        <Descriptions.Item label='Width'>
          <InputNumber
            addonAfter='cm'
            controls
            size='small'
            value={scene.width}
            onChange={(value) =>
              setScene({
                width: value,
              })
            }
          />
        </Descriptions.Item>
        <Descriptions.Item label='Height'>
          <InputNumber
            addonAfter='cm'
            controls
            size='small'
            value={scene.height}
            onChange={(value) =>
              setScene({
                height: value,
              })
            }
          />
        </Descriptions.Item>
        <Descriptions.Item label='Brightness'>
          <div style={{ width: '100%', paddingRight: 20 }}>
            <Slider
              step={0.05}
              marks={{
                0: '0%',
                0.25: '25%',
                0.5: '50%',
                0.75: '75%',
                1.0: '100%',
              }}
              min={0}
              max={1.0}
              value={scene.brightness}
              onChange={(value) =>
                setScene({
                  brightness: value,
                })
              }
              tooltip={{
                formatter: (value) => `${Math.round(value * 100)}%`,
              }}
              style={{ width: '100%' }}
            />
          </div>
        </Descriptions.Item>
        {!basicOnly && (
          <Descriptions.Item
            label='Preview Image'
            contentStyle={{ flexDirection: 'column' }}
          >
            {scene.previewImage && (
              <div
                style={{ aspectRatio: 3 / 2, overflowY: 'auto', width: '100%' }}
              >
                <Image width='100%' src={scene.previewImage} />
              </div>
            )}
            <Button
              style={{ marginTop: 5, width: '100%' }}
              onClick={() => {
                setScene({
                  camera: {
                    position: {
                      x: canvasData?.camera?.canvasCamera?.position?.x,
                      y: canvasData?.camera?.canvasCamera?.position?.y,
                      z: canvasData?.camera?.canvasCamera?.position?.z,
                    },
                    up: canvasData?.camera?.canvasCamera?.up,
                    focusPoint: { ...canvasData?.camera?.focusPoint },
                  },
                  previewImage: takeSnapshot(canvasData.domElement),
                });

                ReactGA.event('take_canvas_snapshot');
              }}
            >
              Take {scene.previewImage ? 'new' : 'a'} Snapshot
            </Button>
          </Descriptions.Item>
        )}
      </Descriptions>
    </>
  );
}
