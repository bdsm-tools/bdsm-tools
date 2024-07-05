import React from 'react';
import { Button, Descriptions, Tooltip } from 'antd';
import CloseSelectionIcon from '@ant-design/icons/CloseCircleOutlined';
import PositionEditorInput from './PositionEditorInput';
import RotationEditorInput from './RotationEditorInput';
import AddTubeDialog from './AddTubeDialog';

export default function CornerEditor({
  node,
  getNode,
  setNode,
  setChainNode,
  addChainNode,
  connection,
  onDeselect,
}) {
  const end = connection.children.end[0]
    ? getNode(connection.children.end[0])
    : undefined;

  return (
    <>
      <Descriptions
        title='Corner'
        layout='vertical'
        size='small'
        extra={
          <Tooltip title='Deselect' placement='left'>
            <Button
              type='text'
              shape='circle'
              icon={<CloseSelectionIcon />}
              onClick={onDeselect}
            />
          </Tooltip>
        }
        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label='Rotation around Tube 1'>
          <RotationEditorInput node={node} setNode={setNode} />
        </Descriptions.Item>
      </Descriptions>
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
