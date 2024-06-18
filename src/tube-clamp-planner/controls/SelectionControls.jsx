import React from 'react'
import { Typography } from 'antd'
import { getTypeDefinition } from '../connectors/types'
import TubeEditor from '../editor/TubeEditor'
import useSelectionStore from '../state/useSelectionStore'
import SurfaceSelectionEditor from '../editor/SurfaceSelectionEditor'
import useSceneStore from '../state/useSceneStore'

const tubeDefinition = {
  Editor: TubeEditor,
}

const getNodeDefinition = (node) => node.node.type === 'tube' ? tubeDefinition : getTypeDefinition(node.node.type);

const surfaceIds = ['side-wall', 'side-wall2', 'back-wall', 'back-wall2', 'floor'];

export default function SelectionControls() {
  const selectionStore = useSelectionStore();
  const { getNode, setChainNode, addChainNode } = useSceneStore();

  if (!selectionStore.selectedNodeId) {
    return (
      <Typography>
        Nothing selected
      </Typography>
    );
  }

  const onDeselect = () => selectionStore.setSelectedNode(undefined);
  const NodeSelector = ({ id }) => (
    <Typography>
      {getNodeDefinition(getNode(id)).name}
    </Typography>
  );

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

  const { Editor = () => null } = getNodeDefinition(node);
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
        NodeSelector={NodeSelector}
      />
    </>
  );
}
