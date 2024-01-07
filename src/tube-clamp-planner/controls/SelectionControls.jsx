import React from 'react'
import { Typography } from 'antd'
import { getTypeDefinition } from '../connectors/types'
import TubeEditor from '../editor/TubeEditor'

const tubeDefinition = {
  Editor: TubeEditor,
}

export default function SelectionControls({ canvasData, scene, getNode, setChainNode, addChainNode }) {
  const [selection, setSelection] = React.useState();
  React.useEffect(() => {
    setSelection(canvasData?.selection?.userData?.id)
  }, [canvasData?.selection?.userData?.id]);

  if (!selection) {
    return (
      <Typography>
        Nothing selected
      </Typography>
    );
  }

  const node = getNode(selection);
  const setNode = setChainNode(selection);

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
        NodeSelector={({ id }) => (
          <Typography>
            {getNodeDefinition(getNode(id)).name}
          </Typography>
        )}
      />
    </>
  );
}

export const NodeEditor = () => {

}