import React from 'react';
import { Button, Descriptions, Image, Input, InputNumber, Slider } from 'antd'
import useSceneStore from '../state/useSceneStore'

const takeSnapshot = (canvas) => (canvas || document.getElementById('tube-planner-canvas')
    ?.getElementsByTagName('canvas')[0])
    ?.toDataURL("image/png");

export default function SceneControls({ basicOnly = false }) {

  const { scene, setScene, canvasData } = useSceneStore();

  return (
    <>
      <Input
        value={scene.title}
        onChange={({ target }) => setScene({
          ...scene,
          title: target.value,
        })}
        size="large"
        placeholder="Scene title"
      />
      <Input.TextArea
        value={scene.description || ''}
        onChange={({ target }) => setScene({
          ...scene,
          description: target.value,
        })}
        size="large"
        placeholder="Scene description"
        style={{ marginTop: 10 }}
      />
      <Descriptions
        title='Scene'
        layout="vertical"
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
            onChange={(value) => setScene({
              ...scene,
              length: value
            })}
          />
        </Descriptions.Item>
        <Descriptions.Item label='Width'>
          <InputNumber
            addonAfter='cm'
            controls
            size='small'
            value={scene.width}
            onChange={(value) => setScene({
              ...scene,
              width: value
            })}
          />
        </Descriptions.Item>
        <Descriptions.Item label='Height'>
          <InputNumber
            addonAfter='cm'
            controls
            size='small'
            value={scene.height}
            onChange={(value) => setScene({
              ...scene,
              height: value
            })}
          />
        </Descriptions.Item>
        <Descriptions.Item label='Brightness'>
          <div style={{ width: '100%', paddingRight: 20 }}>
            <Slider
              step={.05}
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
              onChange={(value) => setScene({
                ...scene,
                brightness: value,
              })}
              tooltip={{
                formatter: (value) => `${Math.round(value * 100)}%`,
              }}
              style={{ width: '100%' }}
            />
          </div>
        </Descriptions.Item>
        {!basicOnly && (
          <Descriptions.Item label='Preview Image' contentStyle={{ flexDirection: 'column' }}>
            {scene.previewImage && (
              <div style={{ aspectRatio: 3 / 2, overflowY: 'auto', width: '100%' }}>
                <Image width='100%' src={scene.previewImage}/>
              </div>
            )}
            <Button
              style={{ marginTop: 5, width: '100%' }}
              onClick={() => setScene({
                ...scene,
                camera: {
                  position: {
                    x: canvasData?.camera?.canvasCamera?.position?.x,
                    y: canvasData?.camera?.canvasCamera?.position?.y,
                    z: canvasData?.camera?.canvasCamera?.position?.z,
                  },
                  up: canvasData?.camera?.canvasCamera?.up,
                  focusPoint: canvasData?.focusPoint,
                },
                previewImage: takeSnapshot(canvasData.domElement),
              })}
            >
              Take {scene.previewImage ? 'new' : 'a'} Snapshot
            </Button>
          </Descriptions.Item>
        )}
      </Descriptions>
    </>
  )
}