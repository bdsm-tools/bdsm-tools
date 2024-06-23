import React from 'react';
import { Button, InputNumber, Modal, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';

export default function AddTubeDialog({ parent, parentSlot, onAdd }) {
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
