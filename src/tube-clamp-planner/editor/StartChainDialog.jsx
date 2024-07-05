import React from 'react';
import { Button, InputNumber, Modal, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import ConnectorSelector from './ConnectorSelector';
import useSceneStore from '../state/useSceneStore';
import SurfaceEditorInput from './SurfaceEditorInput';
import ReactGA from 'react-ga4';

export default function StartChainDialog({ surfaceId, onAdd }) {
  const [open, setOpen] = React.useState(false);
  const [connector, setConnector] = React.useState({ surface: {} });

  React.useEffect(() => {
    if (!open) {
      setConnector({ surface: {} });
    }
  }, [open]);

  return (
    <>
      <Modal
        open={!!open}
        okText='Add'
        onOk={() => {
          onAdd(connector);

          ReactGA.event('add_chain', {
            surface: connector.surface.type,
            type: connector.type,
            position: `${connector.surface.coords[0]}, ${connector.surface.coords[1]}`,
          });

          setOpen(undefined);
        }}
        onCancel={() => setOpen(undefined)}
        okButtonProps={{
          disabled: !connector.type,
        }}
      >
        <Typography>Choose a connector to place on the surface:</Typography>
        <ConnectorSelector
          slot='surface'
          value={connector.type}
          onChange={(type) => setConnector((old) => ({ ...old, type }))}
        />

        <SurfaceEditorInput
          node={connector}
          setNode={(value) =>
            setConnector((old) => ({
              ...old,
              ...value,
            }))
          }
          surfaceId={surfaceId}
        />
      </Modal>
      <Button onClick={() => setOpen(true)}>Start new Chain</Button>
    </>
  );
}
