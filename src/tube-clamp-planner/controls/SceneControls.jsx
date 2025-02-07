import React from 'react';
import {
  Button,
  Checkbox,
  Descriptions,
  Image,
  Input,
  InputNumber,
  Select,
  Slider,
} from 'antd';
import useSceneStore from '../state/useSceneStore';
import ReactGA from 'react-ga4';
import { useDebounce, useDebounceFn } from 'ahooks';

const takeSnapshot = (canvas) =>
  (
    canvas ||
    document
      .getElementById('tube-planner-canvas')
      ?.getElementsByTagName('canvas')[0]
  )?.toDataURL('image/jpeg', 0.3);

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
          <>
            <Descriptions.Item
              label='Enhancements'
              contentStyle={{ flexDirection: 'column' }}
            >
              <Checkbox
                checked={scene.slaveModel?.enabled}
                onChange={({ target }) =>
                  setScene({
                    slaveModel: {
                      ...(scene.slaveModel || {}),
                      enabled: target.checked,
                      position: [scene.length / 2, 0, scene.width / 2],
                      rotation: [0, 0, 0],
                    },
                  })
                }
              >
                Show Slave Model
              </Checkbox>
              {scene.slaveModel?.enabled && (
                <Select
                  className='full-width'
                  options={[
                    { value: 'default', label: 'T Pose (Default)' },
                    { value: 'star', label: 'Star' },
                    { value: 'submissive', label: 'Submissive' },
                    { value: 'stretch', label: 'Stretch' },
                    { value: 'stand', label: 'Stand' },
                    { value: 'stand-hands-up', label: 'Stand with Hands Up' },
                    { value: 'kneel', label: 'Kneel' },
                    { value: 'kneel-hands-up', label: 'Kneel with Hands Up' },
                    { value: 'bend-over', label: 'Bend Over' },
                    {
                      value: 'bend-over-hands-up',
                      label: 'Bend Over with Hands Up',
                    },
                    { value: 'kneel-sit', label: 'Kneel Sitting' },
                    { value: 'pile-driver', label: 'Pile Driver' },
                    { value: 'missionary', label: 'Missionary' },
                    { value: 'doggy', label: 'Doggy' },
                    { value: 'ass-up-face-down', label: 'Ass up, Face Down' },
                  ]}
                  value={scene.slaveModel.pose}
                  defaultValue='default'
                  onChange={(value) =>
                    setScene({
                      slaveModel: {
                        enabled: true,
                        pose: value,
                      },
                    })
                  }
                />
              )}
            </Descriptions.Item>
            <Descriptions.Item label='Post Processing'>
              <div style={{ width: '100%', paddingRight: 20 }}>
                <Checkbox
                  checked={scene.settings?.n8ao}
                  onChange={({ target }) =>
                    setScene({
                      settings: {
                        ...(scene.settings || {}),
                        n8ao: target.checked,
                      },
                    })
                  }
                >
                  Enable N8AO
                </Checkbox>
                <Checkbox
                  checked={scene.settings?.smaa}
                  onChange={({ target }) =>
                    setScene({
                      settings: {
                        ...(scene.settings || {}),
                        smaa: target.checked,
                      },
                    })
                  }
                >
                  Enable SMAA
                </Checkbox>
              </div>
            </Descriptions.Item>
            <Descriptions.Item
              label='Preview Image'
              contentStyle={{ flexDirection: 'column' }}
            >
              {scene.previewImage && (
                <div
                  style={{
                    aspectRatio: 3 / 2,
                    overflowY: 'auto',
                    width: '100%',
                  }}
                >
                  <Image width='100%' src={scene.previewImage} />
                </div>
              )}
              <Button
                style={{ marginTop: 5, width: '100%' }}
                onClick={() => {
                  const canvasCameraPosition = canvasData?.camera?.position;
                  const canvasCameraRotation = canvasData?.camera?.rotation;
                  const canvasCameraFocusPoint = canvasData?.camera?.focusPoint;
                  setScene({
                    camera: {
                      position: {
                        x: canvasCameraPosition?.x,
                        y: canvasCameraPosition?.y,
                        z: canvasCameraPosition?.z,
                      },
                      rotation: {
                        x: canvasCameraRotation?.x,
                        y: canvasCameraRotation?.y,
                        z: canvasCameraRotation?.z,
                      },
                      focusPoint: {
                        x: canvasCameraFocusPoint?.x,
                        y: canvasCameraFocusPoint?.y,
                        z: canvasCameraFocusPoint?.z,
                      },
                      up: canvasData?.camera?.up,
                    },
                    previewImage: takeSnapshot(canvasData.domElement),
                  });

                  ReactGA.event('take_canvas_snapshot');
                }}
              >
                Take {scene.previewImage ? 'new' : 'a'} Snapshot
              </Button>
            </Descriptions.Item>
          </>
        )}
      </Descriptions>
    </>
  );
}
