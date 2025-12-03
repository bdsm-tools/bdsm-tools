import React from 'react';
import { Button, Collapse, Descriptions, Tooltip } from 'antd';
import CloseSelectionIcon from '@ant-design/icons/CloseCircleOutlined';
import PositionEditorInput from './PositionEditorInput';
import RotationEditorInput from './RotationEditorInput';
import AddTubeDialog from './AddTubeDialog';
import SurfaceEditorInput from './SurfaceEditorInput';
import { DeleteOutlined } from '@ant-design/icons';
import RemoveNodeDialog from './RemoveNodeDialog';

export default function PlatformEditor({
  node,
  getNode,
  setNode,
  connection,
  onDeselect,
}) {
  const parent = connection.parent ? getNode(connection.parent) : undefined;

  return (
    <>
      <Descriptions
        title='Platform'
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
        <Descriptions.Item label='Position on Tube'>
          <PositionEditorInput
            node={node}
            setNode={setNode}
            max={parent?.node.length}
          />
        </Descriptions.Item>
        <Descriptions.Item label='Rotation around Tube'>
          <RotationEditorInput node={node} setNode={setNode} />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}
