import React from 'react';
import { Slider } from 'antd';

export default function PositionEditorInput({ node, setNode, max }) {
  return (
    <div style={{ width: '100%', paddingRight: 20 }}>
      <Slider
        marks={{
          0: '0cm',
          [node.position]: `${node.position}cm`,
          [max || node.length]: `${max || node.length}cm`,
        }}
        min={0}
        max={max || node.length}
        value={node.position}
        onChange={(value) =>
          setNode({
            position: value,
          })
        }
        tooltip={{
          formatter: (value) => `${value}cm`,
        }}
        style={{ width: '100%' }}
      />
    </div>
  );
}
