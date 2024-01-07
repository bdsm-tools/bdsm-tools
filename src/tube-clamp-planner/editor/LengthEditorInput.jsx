import React from 'react';
import { Descriptions, InputNumber, Slider } from 'antd'

export default function LengthEditorInput({ node, setNode }) {
  return (
    <InputNumber
      addonAfter='cm'
      controls
      size='small'
      value={node.length}
      onChange={(value) => setNode({
        length: value > 0 ? value : node.length,
        position: !node.position ? undefined : (node.position > (value > 0 ? value : node.length) ? (value > 0 ? value : node.length) : node.position)
      })}
    />
  );
}