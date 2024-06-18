import React from 'react';
import { useSelect } from '@react-three/drei';
import { Card, PageHeader, Segmented } from 'antd';
import { useNavigate } from 'react-router';
import SceneControls from './SceneControls';
import SelectionControls from './SelectionControls';
import ControlsDialog from './ControlsDialog';
import useSelectionStore from '../state/useSelectionStore';
import useSceneStore from '../state/useSceneStore'
import { useThree } from '@react-three/fiber'

export default function GuiControls() {
  const [tab, setTab] = React.useState('Scene');
  const navigate = useNavigate();
  const { selectedNodeId } = useSelectionStore();

  React.useEffect(() => {
    if (selectedNodeId) {
      setTab('Selection');
    }
  }, [selectedNodeId]);

  return (
    <Card
      style={{ width: 400 }}
      bodyStyle={{ padding: 0, height: '100%', width: 400 }}
    >
      <PageHeader
        title={'Tube Planner'}
        onBack={() => navigate('..')}
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
          <SceneControls />
        )}
        {tab === 'Selection' && (
          <SelectionControls />
        )}
      </div>
      <ControlsDialog />
    </Card>
  );
}

export function CaptureSelection() {
  const { camera } = useThree();
  const [selection, ...extraSelections] = useSelect();
  const selectionStore = useSelectionStore();
  const { setCanvasData } = useSceneStore();

  React.useEffect(() => {
    selectionStore.setSelectedNode(selection?.userData?.id);
    setCanvasData({
      selection,
    });

    if (selection?.userData.cameraPositionOnFocus) {
      camera.position.set(...selection?.userData.cameraPositionOnFocus);
    }
  }, [selection]);
  return null;
}
