import React from 'react';
import { Slider } from 'antd';

export default function RotationEditorInput({ node, setNode }) {
  return (
    <div style={{ width: '100%', paddingRight: 20 }}>
      <Slider
        marks={{
          0: '0°',
          45: '45°',
          90: '90°',
          135: '135°',
          180: '180°',
          225: '225°',
          270: '270°',
          315: '315°',
          360: '360°',
        }}
        min={0}
        max={360}
        value={node.rotation || 0}
        onChange={(value) =>
          setNode({
            rotation: value,
          })
        }
        tooltip={{
          formatter: (value) => `${value}°`,
        }}
        style={{ width: '100%' }}
      />
    </div>
  );
}
