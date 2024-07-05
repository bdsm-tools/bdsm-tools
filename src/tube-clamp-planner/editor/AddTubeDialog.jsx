import React from 'react';
import { Button, InputNumber, Modal, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import ReactGA from 'react-ga4';
import useSceneStore from '../state/useSceneStore';

export default function AddTubeDialog({ parent, parentSlot, onAdd }) {
  const sceneStore = useSceneStore();

  const [open, setOpen] = React.useState(false);
  const [tube, setTube] = React.useState({});

  React.useEffect(() => {
    if (!open) {
      setTube({
        length: 0,
        type: 'tube',
        position: 0,
      });
    }
  }, [open]);

  return (
    <>
      <Modal
        open={open}
        onOk={() => {
          onAdd({
            id: uuidv4(),
            node: tube,
            parent,
            parentSlot,
            children: {
              middle: [],
              end: [],
            },
          });

          try {
            ReactGA.event('add_tube', {
              parent: sceneStore.getNode(parent)?.node?.type,
              parentSlot,
              length: tube.length,
              position: tube.position,
            });
          } catch (e) {
            // Don't worry, it's just analytics
            console.error(e);
          }

          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      >
        <Typography>Choose a length of the connecting tube:</Typography>
        <InputNumber
          addonAfter='cm'
          controls
          size='small'
          autoFocus
          min={10}
          max={1000}
          value={tube.length}
          onChange={(value) =>
            setTube((old) => ({
              ...old,
              length: value,
              position: Math.floor(value / 2),
            }))
          }
        />
      </Modal>
      <Button onClick={() => setOpen(true)}>Connect tube</Button>
    </>
  );
}
