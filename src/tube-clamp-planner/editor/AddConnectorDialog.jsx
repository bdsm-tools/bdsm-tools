import React from 'react';
import { Button, InputNumber, Modal, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import ConnectorSelector from './ConnectorSelector';

export default function AddConnectorDialog({ parent, tube, onAdd }) {
  const [open, setOpen] = React.useState();
  const [connector, setConnector] = React.useState({});

  const tubeEndConnections = [
    ...tube.children.end,
    open === 'end' ? tube.parent : undefined,
  ].filter((value) => !!value);

  const tubeMiddleConnections = [
    ...tube.children.middle,
    open === 'middle' ? tube.parent : undefined,
  ].filter((value) => !!value);

  React.useEffect(() => {
    if (!open) {
      setConnector({
        position: undefined,
      });
    } else if (open === 'middle') {
      setConnector({
        position: 0,
      });
    }
  }, [open]);

  return (
    <>
      <Modal
        open={!!open}
        okText='Add'
        onOk={() => {
          onAdd({
            id: uuidv4(),
            node: connector,
            parent,
            parentSlot: open,
            children: {
              middle: [],
              end: [],
            },
          });
          setOpen(undefined);
        }}
        onCancel={() => setOpen(undefined)}
        okButtonProps={{
          disabled: !connector.type,
        }}
      >
        <Typography>Choose a connector to place on the tube:</Typography>
        <ConnectorSelector
          slot={open}
          value={connector.type}
          onChange={(type) => setConnector((old) => ({ ...old, type }))}
        />
        {open === 'middle' && (
          <>
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
              onChange={(value) =>
                setConnector((old) => ({
                  ...old,
                  position: value,
                }))
              }
            />
          </>
        )}
      </Modal>
      <Button onClick={() => setOpen('middle')}>Add Middle Connection</Button>
      {tubeEndConnections.length < 2 && (
        <Button onClick={() => setOpen('end')}>Add End Connection</Button>
      )}
    </>
  );
}
