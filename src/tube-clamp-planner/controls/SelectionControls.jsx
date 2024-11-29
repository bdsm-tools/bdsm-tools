import React from 'react';
import { Typography } from 'antd';
import { getTypeDefinition } from '../connectors/types';
import useSelectionStore from '../state/useSelectionStore';
import SurfaceSelectionEditor from '../editor/SurfaceSelectionEditor';
import useSceneStore from '../state/useSceneStore';
import ConnectionEditor from '../editor/ConnectionEditor';

const surfaceIds = [
  'side-wall',
  'side-wall2',
  'back-wall',
  'back-wall2',
  'floor',
];

export default function SelectionControls() {
  const selectionStore = useSelectionStore();
  const { getNode, setChainNode, addChainNode } = useSceneStore();

  if (!selectionStore.selectedNodeId) {
    return <Typography>Nothing selected</Typography>;
  }

  const onDeselect = () => selectionStore.setSelectedNode(undefined);

  if (surfaceIds.includes(selectionStore.selectedNodeId)) {
    return (
      <SurfaceSelectionEditor
        surfaceId={selectionStore.selectedNodeId}
        onDeselect={onDeselect}
        NodeSelector={NodeSelector}
      />
    );
  }

  const node = getNode(selectionStore.selectedNodeId);
  const setNode = setChainNode(selectionStore.selectedNodeId);

  const { Editor = () => null } = getTypeDefinition(node.node.type);
  return (
    <>
      <Editor
        node={node.node}
        setNode={setNode}
        setChainNode={setChainNode}
        addChainNode={addChainNode}
        getNode={getNode}
        connection={node}
        onDeselect={onDeselect}
      />
      <ConnectionEditor parentConnection={node} />
    </>
  );
}
