import { Descriptions, InputNumber, Typography } from 'antd'
import React from 'react'

export default function SceneControls({ scene }) {

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
          />
        </Descriptions.Item>
        <Descriptions.Item label='Width'>
          <InputNumber
            addonAfter='cm'
            controls
            size='small'
            value={scene.width}
          />
        </Descriptions.Item>

      </Descriptions>
      </>
  )
}