import React from 'react'
import { Button, InputNumber, Modal, Select, Typography } from 'antd'
import { v4 as uuidv4 } from 'uuid';
import { getTypeDefinitionsAsOptions } from '../connectors/types'

export default function AddConnectorDialog({ parent, tube, onAdd }) {
  const [open, setOpen] = React.useState();
  const [connector, setConnector] = React.useState({});

  const tubeEndConnections = [
    ...tube.children.end,
    open === 'end' ? tube.parent : undefined,
  ].filter(value => !!value);

  const tubeMiddleConnections = [
    ...tube.children.middle,
    open === 'middle' ? tube.parent : undefined,
  ].filter(value => !!value);

  React.useEffect(() => {
    if (!open) {
      setConnector({
        position: 0,
      });
    }
  }, [open]);

  return (
    <>
      <Modal
        open={!!open}
        onOk={() => {
          onAdd({
            id: uuidv4(),
            node: connector,
            parent,
            parentSlot: open,
            children: {
              middle: [],
              end: [],
            }
          });
          setOpen(undefined);
        }}
        onCancel={() => setOpen(undefined)}
      >
        <Typography>
          Choose a position to place the connector on the tube:
        </Typography>
        <Select
          size='small'
          options={getTypeDefinitionsAsOptions((def) => {
            if (open === 'end') return def.endConnections > 0;
            if (open === 'middle') return def.middleConnections > 0;
            return true;
          })}
          value={connector.type}
          onChange={(value) => setConnector((old) => ({
            ...old,
            type: value,
          }))}
          style={{ width: 300 }}
        />

        <Typography>
          Choose a position to place the connector on the tube:
        </Typography>
        <InputNumber
          addonAfter='cm'
          controls
          size='small'
          autoFocus
          min={0}
          max={tube.node.length}
          value={connector.position}
          onChange={(value) => setConnector((old) => ({
            ...old,
            position: value,
          }))}
        />
      </Modal>
      <Button onClick={() => setOpen('middle')}>
        Add Middle Connection
      </Button>
      {tubeEndConnections.length < 2 && (
        <Button onClick={() => setOpen('end')}>
          Add End Connection
        </Button>
      )}
    </>
  )
}