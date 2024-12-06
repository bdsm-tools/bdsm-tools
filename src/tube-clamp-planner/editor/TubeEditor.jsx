import React from 'react';
import { Button, Collapse, Descriptions, Tooltip } from 'antd';
import CloseSelectionIcon from '@ant-design/icons/CloseCircleOutlined';
import PositionEditorInput from './PositionEditorInput';
import LengthEditorInput from './LengthEditorInput';
import RotationEditorInput from './RotationEditorInput';
import AddConnectorDialog from './AddConnectorDialog';
import RemoveNodeDialog from './RemoveNodeDialog';

export default function TubeEditor({
  node,
  setNode,
  connection,
  onDeselect,
  addChainNode,
}) {
  return (
    <>
      <Descriptions
        title='Tube'
        layout='vertical'
        size='small'
        extra={
          <>
            <Tooltip title='Deselect' placement='left'>
              <Button
                type='text'
                shape='circle'
                icon={<CloseSelectionIcon />}
                onClick={onDeselect}
              />
            </Tooltip>
            <RemoveNodeDialog node={connection} showIconOnly />
          </>
        }
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label='Length'>
          <LengthEditorInput node={node} setNode={setNode} />
        </Descriptions.Item>
        <Descriptions.Item label='Rotation'>
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
    </>
  );
}
