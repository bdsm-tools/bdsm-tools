import React from 'react';
import useSceneStore from '../state/useSceneStore';
import useSelectionStore from '../state/useSelectionStore';
import { getTypeDefinition } from '../connectors/types';
import { Button, List } from 'antd';
import { SelectOutlined } from '@ant-design/icons';
import RemoveNodeDialog from './RemoveNodeDialog';
import ConnectorPreview from './ConnectorPreview';

const NodePropertyView = (node) => {
  const v = (data, prefix = '') =>
    Object.entries(data)
      .filter(([k]) => k !== 'type')
      .map(([key, value]) => {
        if (typeof value !== 'object') {
          return `${prefix}${key}=${value}`;
        }
        return v(value, `${prefix}${key}.`);
      })
      .join(', ');

  return v(node.node);
};

export default function NodeListItem({ id, hideActions = false }) {
  const { getNode } = useSceneStore();

  const node = getNode(id);
  if (!node) return null;

  const nodeDef = getTypeDefinition(getNode(id).node.type);
  return (
    <List.Item
      actions={
        !hideActions && [
          <Button
            icon={<SelectOutlined />}
            size='small'
            onClick={() => {
              // TODO: find out how to programmatically select a node
            }}
          >
            Select (WIP)
          </Button>,
          <RemoveNodeDialog node={node} />,
        ]
      }
    >
      <List.Item.Meta
        avatar={<ConnectorPreview connectorType={nodeDef.type} />}
        title={nodeDef.name}
        description={<NodePropertyView node={node.node} />}
      />
    </List.Item>
  );
}
