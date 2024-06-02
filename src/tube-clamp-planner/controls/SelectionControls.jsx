import React from 'react'
import { Typography } from 'antd'
import { getTypeDefinition } from '../connectors/types'
import TubeEditor from '../editor/TubeEditor'
import useSelectionStore from '../state/useSelectionStore'

const tubeDefinition = {
  Editor: TubeEditor,
}

export default function SelectionControls({ canvasData, scene, getNode, setChainNode, addChainNode }) {
  const selectionStore = useSelectionStore();

  if (!selectionStore.selectedNodeId) {
    return (
      <Typography>
        Nothing selected
      </Typography>
    );
  }

  const node = getNode(selectionStore.selectedNodeId);
  const setNode = setChainNode(selectionStore.selectedNodeId);

  const getNodeDefinition = (node) => node.node.type === 'tube' ? tubeDefinition : getTypeDefinition(node.node.type);
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
        onDeselect={() => selectionStore.setSelectedNode(undefined)}
        NodeSelector={({ id }) => (
          <Typography>
            {getNodeDefinition(getNode(id)).name}
          </Typography>
        )}
      />
    </>
  );
}
