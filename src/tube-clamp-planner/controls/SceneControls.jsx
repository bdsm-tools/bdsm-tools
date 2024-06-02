import { Descriptions, InputNumber, Slider, Typography } from 'antd'
import React from 'react'

export default function SceneControls ({ scene, setScene }) {

  return (
    <>
      <Descriptions
        title='Scene'
        layout="vertical"
        size='small'
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
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
      </Descriptions>
    </>
  )
}