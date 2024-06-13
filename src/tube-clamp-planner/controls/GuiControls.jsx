import React from 'react';
import { useSelect } from '@react-three/drei';
import { Card, PageHeader, Segmented } from 'antd';
import { useNavigate } from 'react-router';
import SceneControls from './SceneControls';
import SelectionControls from './SelectionControls';
import ControlsDialog from './ControlsDialog';
import useSelectionStore from '../state/useSelectionStore';

export default function GuiControls({ canvasData, scene, setScene, getNode, setChainNode, addChainNode }) {
  const { selection } = canvasData;
  const [tab, setTab] = React.useState('Scene');
  const navigate = useNavigate();

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
      <PageHeader
        title={'Tube Planner'}
        onBack={() => navigate('/tools/tube-planner')}
        style={{ padding: '5px 20px' }}
      />
      <Segmented
        block
        value={tab}
        options={['Scene', 'Selection', 'Camera']}
        onChange={(value) => setTab(value)}
      />

      <div style={{ padding: 10, height: 'calc(100% - 64px - 50px)', overflowY: 'scroll' }}>
        {tab === 'Scene' && (
          <SceneControls scene={scene} setScene={setScene} />
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
      <ControlsDialog />
    </Card>
  );
}

export function CanvasDataCapture({ setData }) {
  const [selection, ...extraSelections] = useSelect();
  const selectionStore = useSelectionStore();

  React.useEffect(() => {
    setData({
      selection,
      extraSelections,
    });
    selectionStore.setSelectedNode(selection?.userData?.id);
  }, [selection]);
  return null;
}
