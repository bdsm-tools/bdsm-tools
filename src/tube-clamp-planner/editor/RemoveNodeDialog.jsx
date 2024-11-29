import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Alert, Button, List, Modal, Tooltip, Tree } from 'antd';
import ReactGA from 'react-ga4';
import NodeListItem from './NodeListItem';
import { getTypeDefinition } from '../connectors/types';
import useSceneStore from '../state/useSceneStore';
import useSelectionStore from '../state/useSelectionStore';

export default function RemoveNodeDialog({ node, showIconOnly = false }) {
  const [open, setOpen] = React.useState(false);

  const { getNode, removeChainNode } = useSceneStore();
  const selectionStore = useSelectionStore();

  const getTreeNode = (id, root = undefined) => {
    const childNode = getNode(id);
    const childNodeDef = getTypeDefinition(childNode.node.type);

    return ({
      key: id,
      title: childNodeDef.name + (root === 'this' ? ' (this)' : ''),
      children: [...childNode.children.middle, ...childNode.children.end].map(getTreeNode),
    });
  };

  return (
    <>
      <Modal
        open={!!open}
        title='Remove this Node?'
        okText='Remove'
        onOk={() => {
          if (selectionStore.selectedNodeId === node.id) {
            selectionStore.setSelectedNode(undefined);
          }
          removeChainNode(node.id);

          try {
            ReactGA.event('remove_connector', {
              type: node.node.type,
              parent: node.parent,
            });
          } catch (e) {
            // Don't worry, it's just analytics
            console.error(e);
          }

          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        okButtonProps={{
          severity: 'danger',
        }}
      >
        <List
          size='large'
          bordered
          itemLayout='vertical'
          dataSource={[node]}
          renderItem={({ id }) => <NodeListItem id={id} key={id} hideActions />}
        />
<br/>
        <Alert
          type='warning'
          showIcon
          description='Removing this node will also remove all connected child nodes. See below for details.'
        />
<br/>
        <Tree
          defaultExpandAll
          showLine
          treeData={[getTreeNode(node.id, 'this')]}
        />

      </Modal>
      {showIconOnly && (
        <Tooltip title='Remove' placement='left'>
        <Button
          type='text'
          shape='circle'
          icon={<DeleteOutlined />}
          onClick={() => setOpen(true)}
        />
        </Tooltip>
      )}
      {!showIconOnly && (
        <Button
          icon={<DeleteOutlined />}
          size='small'
          onClick={() => setOpen(true)}
        >
          Remove
        </Button>
      )}
    </>
  )
}