import React from 'react';
import { Button, Collapse, Descriptions, Tooltip } from 'antd'
import CloseSelectionIcon from '@ant-design/icons/CloseCircleOutlined'
import PositionEditorInput from './PositionEditorInput'
import RotationEditorInput from './RotationEditorInput'
import AddTubeDialog from './AddTubeDialog'
import SurfaceEditorInput from './SurfaceEditorInput'

export default function FlangeEditor({ node, getNode, setNode, addChainNode, connection, onDeselect, NodeSelector }) {

  const end = connection.children.end[0] ? getNode(connection.children.end[0]) : undefined;

  return (
    <>
      <Descriptions
        title='Flange'
        layout="vertical"
        size='small'
        extra={(
          <Tooltip title='Deselect' placement="left">
            <Button
              type="text"
              shape="circle"
              icon={<CloseSelectionIcon />}
              onClick={onDeselect}
            />
          </Tooltip>
        )}
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label='Surface Connection'>
          <SurfaceEditorInput node={node} setNode={setNode} surfaceId={node.surface.type} />
        </Descriptions.Item>
      </Descriptions>
      {end && (
        <Collapse ghost>
          <Collapse.Panel key={1} header='End Connections'>
            <NodeSelector id={end.id} />
          </Collapse.Panel>
        </Collapse>
      )}
      {!end && (
        <AddTubeDialog
          parent={connection.id}
          parentSlot='end'
          onAdd={addChainNode}
        />
      )}
    </>
  );
}
