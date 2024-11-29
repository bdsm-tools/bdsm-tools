import React from 'react';
import { Button, Descriptions, Tooltip } from 'antd';
import CloseSelectionIcon from '@ant-design/icons/CloseCircleOutlined';
import PositionEditorInput from './PositionEditorInput';
import RotationEditorInput from './RotationEditorInput';
import AddTubeDialog from './AddTubeDialog';
import RemoveNodeDialog from './RemoveNodeDialog';

export default function CrossoverEditor({
  node,
  getNode,
  setNode,
  setChainNode,
  addChainNode,
  connection,
  onDeselect,
}) {
  const parent = connection.parent ? getNode(connection.parent) : undefined;
  const middle = connection.children.middle[0]
    ? getNode(connection.children.middle[0])
    : undefined;

  return (
    <>
      <Descriptions
        title='Crossover'
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
        <Descriptions.Item label='Connection 1 Position on Tube'>
          <PositionEditorInput
            node={node}
            setNode={setNode}
            max={parent?.node.length}
          />
        </Descriptions.Item>
        {middle && (
          <Descriptions.Item label='Connection 2 Position on Tube'>
            <PositionEditorInput
              node={middle.node}
              setNode={setChainNode(middle.id)}
              max={middle?.node.length}
            />
          </Descriptions.Item>
        )}
        <Descriptions.Item label='Rotation around Connection/Tube 1'>
          <RotationEditorInput node={node} setNode={setNode} />
        </Descriptions.Item>
      </Descriptions>
      {!middle && (
        <AddTubeDialog
          parent={connection.id}
          parentSlot='middle'
          onAdd={addChainNode}
        />
      )}
    </>
  );
}
