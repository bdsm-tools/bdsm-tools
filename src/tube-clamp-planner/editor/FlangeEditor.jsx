import React from 'react';
import { Button, Collapse, Descriptions, Tooltip } from 'antd';
import CloseSelectionIcon from '@ant-design/icons/CloseCircleOutlined';
import PositionEditorInput from './PositionEditorInput';
import RotationEditorInput from './RotationEditorInput';
import AddTubeDialog from './AddTubeDialog';
import SurfaceEditorInput from './SurfaceEditorInput';
import { DeleteOutlined } from '@ant-design/icons';
import RemoveNodeDialog from './RemoveNodeDialog';

export default function FlangeEditor({
  node,
  getNode,
  setNode,
  addChainNode,
  connection,
  onDeselect,
}) {
  const end = connection.children.end[0]
    ? getNode(connection.children.end[0])
    : undefined;

  const parent = connection.parent ? getNode(connection.parent) : undefined;

  return (
    <>
      <Descriptions
        title='Flange'
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
      ></Descriptions>
      {node.surface && (
        <SurfaceEditorInput
          node={node}
          setNode={setNode}
          surfaceId={node.surface.type}
        />
      )}
      {!end && !parent && (
        <AddTubeDialog
          parent={connection.id}
          parentSlot='end'
          onAdd={addChainNode}
        />
      )}
    </>
  );
}
