import React from 'react';
import {
  Button,
  Collapse,
  Descriptions,
  List,
  Tooltip,
  Typography,
} from 'antd';
import CloseSelectionIcon from '@ant-design/icons/CloseCircleOutlined';
import useSceneStore from '../state/useSceneStore';
import StartChainDialog from './StartChainDialog';
import NodeListItem from './NodeListItem';

const surfaceIds = {
  'side-wall': 'Left Side Wall',
  'side-wall2': 'Right Side Wall',
  'back-wall': 'Back Wall',
  'back-wall2': 'Front Wall',
  floor: 'Floor',
};

export default function SurfaceSelectionEditor({ surfaceId, onDeselect }) {
  const { chains, addChain } = useSceneStore();

  const surfaceConnections = chains
    .flatMap((chain) => Object.values(chain))
    .filter((connection) => connection.node?.surface?.type === surfaceId)
    .map((connection) => connection.id);

  return (
    <>
      <Descriptions
        title={surfaceIds[surfaceId]}
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
      />
      <Collapse ghost activeKey={[1]}>
        <Collapse.Panel key={1} header='Surface Connections'>
          <List
            size='large'
            bordered
            itemLayout='vertical'
            dataSource={surfaceConnections}
            renderItem={(node) => <NodeListItem id={node} key={node} />}
          />
        </Collapse.Panel>
      </Collapse>
      <StartChainDialog surfaceId={surfaceId} onAdd={addChain} />
    </>
  );
}
