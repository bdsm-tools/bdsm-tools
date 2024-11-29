import React from 'react';
import { Collapse, List } from 'antd';
import { getTypeDefinition } from '../connectors/types';
import useSceneStore from '../state/useSceneStore';
import NodeListItem from './NodeListItem';

export default function ConnectionEditor({ parentConnection }) {
  const { getNode } = useSceneStore();

  if (!parentConnection) return null;

  const nodeDef = getTypeDefinition(getNode(parentConnection.id).node.type);
  const middleConnections = [
    ...parentConnection.children.middle,
    parentConnection.parent && parentConnection.parentSlot === 'middle' ? parentConnection.parent : undefined,
  ].filter(Boolean);
  const endConnections = [
      ...parentConnection.children.end,
      parentConnection.parent && parentConnection.parentSlot === 'end' ? parentConnection.parent : undefined
  ].filter(Boolean);

  return (
    <Collapse ghost>
      {nodeDef.middleConnections !== 0 && (
        <Collapse.Panel key={1} header={`Middle Connections (${middleConnections.length}/${nodeDef.middleConnections})`}>
          <List
            size='large'
            bordered
            itemLayout='vertical'
            dataSource={middleConnections}
            renderItem={(node) => <NodeListItem id={node} key={node} />}
          />
        </Collapse.Panel>
      )}
      {nodeDef.endConnections !== 0 && (
        <Collapse.Panel key={2} header={`End Connections (${endConnections.length}/${nodeDef.endConnections})`}>
          <List
            size='large'
            bordered
            itemLayout='vertical'
            dataSource={endConnections}
            renderItem={(node) => <NodeListItem id={node} key={node} />}
          />
        </Collapse.Panel>
      )}
    </Collapse>
  );
}