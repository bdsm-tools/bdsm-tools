import React from 'react';
import { Html, useSelect } from '@react-three/drei'
import { Card, Divider, InputNumber, Segmented, Typography } from 'antd'
import SceneControls from './SceneControls'
import SelectionControls from './SelectionControls'

export default function GuiControls({ canvasData, scene, getNode, setChainNode, addChainNode }) {
  const { selection } = canvasData;
  const [tab, setTab] = React.useState('Scene');

  React.useEffect(() => {
    if (selection) {
      setTab('Selection');
    }
  }, [selection]);

  return (
    <Card
      style={{ width: 400 }}
      bodyStyle={{ padding: 0, height: '100%', width: 400 }}
    >
      <Segmented
        block
        value={tab}
        options={['Scene', 'Selection', 'Camera']}
        onChange={(value) => setTab(value)}
      />

      <div style={{ padding: 10, height: 'calc(100% - 32px)', overflowY: 'scroll' }}>
        {tab === 'Scene' && (
          <SceneControls scene={scene} />
        )}
        {tab === 'Selection' && (
          <SelectionControls
            canvasData={canvasData}
            scene={scene}
            getNode={getNode}
            setChainNode={setChainNode}
            addChainNode={addChainNode}
          />
        )}
      </div>
    </Card>
  );
}

export function CanvasDataCapture({ setData }) {
  const [selection, ...extraSelections] = useSelect();

  React.useEffect(() => {
    setData({
      selection,
      extraSelections,
    });
  }, [selection]);
  return null;
}
