import React from 'react';
import { Button, Collapse, Descriptions, Tooltip } from 'antd'
import CloseSelectionIcon from '@ant-design/icons/CloseCircleOutlined'
import PositionEditorInput from './PositionEditorInput'
import LengthEditorInput from './LengthEditorInput'
import RotationEditorInput from './RotationEditorInput'
import AddConnectorDialog from './AddConnectorDialog'

export default function TubeEditor({ node, setNode, connection, onDeselect, addChainNode, NodeSelector }) {
  return (
    <>
      <Descriptions
        title='Tube'
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
        <Descriptions.Item label='Length'>
          <LengthEditorInput node={node} setNode={setNode} />
        </Descriptions.Item>
        <Descriptions.Item label='Rotation (WIP)'>
          <RotationEditorInput node={node} setNode={setNode} />
        </Descriptions.Item>
        {connection.parent && connection.parentSlot === 'middle' && (
          <Descriptions.Item label='Position'>
            <PositionEditorInput node={node} setNode={setNode} />
          </Descriptions.Item>
        )}
      </Descriptions>

      <AddConnectorDialog
        parent={connection.id}
        tube={connection}
        onAdd={addChainNode}
      />

      <Collapse ghost>
        <Collapse.Panel key={1} header='Middle Connections'>
          {connection.children.middle.map(node => (
            <NodeSelector id={node} key={node} />
          ))}
          {connection.parent && connection.parentSlot === 'middle' && (
            <NodeSelector id={connection.parent} />
          )}
        </Collapse.Panel>
        <Collapse.Panel key={2} header='End Connections'>
          {connection.children.end.map(node => (
            <NodeSelector id={node} key={node} />
          ))}
          {connection.parent && connection.parentSlot === 'end' && (
            <NodeSelector id={connection.parent} />
          )}
        </Collapse.Panel>
      </Collapse>
    </>
  );
}
