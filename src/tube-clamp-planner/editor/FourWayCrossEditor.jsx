import React from 'react';
import { Button, Descriptions, Tooltip } from 'antd';
import CloseSelectionIcon from '@ant-design/icons/CloseCircleOutlined';
import PositionEditorInput from './PositionEditorInput';
import RotationEditorInput from './RotationEditorInput';
import AddTubeDialog from './AddTubeDialog';
import RemoveNodeDialog from './RemoveNodeDialog';

export default function FourWayCrossEditor({
  node,
  getNode,
  setNode,
  setChainNode,
  addChainNode,
  connection,
  onDeselect,
}) {
  const slot = connection.parentSlot;
  const parent = connection.parent ? getNode(connection.parent) : undefined;

  const middle = connection.children.middle[0]
    ? getNode(connection.children.middle[0])
    : undefined;

  const end1 = connection.children.end[0]
    ? getNode(connection.children.end[0])
    : undefined;
  const end2 = connection.children.end[1]
    ? getNode(connection.children.end[1])
    : undefined;
  const end3 = connection.children.end[2]
    ? getNode(connection.children.end[2])
    : undefined;
  const end4 = connection.children.end[3]
    ? getNode(connection.children.end[3])
    : undefined;

  return (
    <>
      <Descriptions
        title='4 Way Cross'
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
        {slot === 'end' && middle && (
          <Descriptions.Item label='Tube Position'>
            <PositionEditorInput
              node={middle.node}
              setNode={setChainNode(middle.id)}
              max={middle?.node.length}
            />
          </Descriptions.Item>
        )}
        {slot === 'middle' && (
          <Descriptions.Item label='Position on Tube'>
            <PositionEditorInput
              node={node}
              setNode={setNode}
              max={parent?.node.length}
            />
          </Descriptions.Item>
        )}
        <Descriptions.Item label='Rotation around Tube'>
          <RotationEditorInput node={node} setNode={setNode} />
        </Descriptions.Item>
      </Descriptions>
      {slot === 'end' && !middle && (
        <AddTubeDialog
          parent={connection.id}
          parentSlot='middle'
          onAdd={addChainNode}
        />
      )}
      {slot === 'end' && (!end1 || !end2 || !end4) && (
        <AddTubeDialog
          parent={connection.id}
          parentSlot='end'
          onAdd={addChainNode}
          options={{
            0: end1,
            1: end2,
            2: true,
            3: end4,
          }}
        />
      )}
      {slot === 'middle' && (!end1 || !end2 || !end3 || !end4) && (
        <AddTubeDialog
          parent={connection.id}
          parentSlot='end'
          onAdd={addChainNode}
          options={{
            0: end1,
            1: end2,
            2: end3,
            3: end4,
          }}
        />
      )}
    </>
  );
}
