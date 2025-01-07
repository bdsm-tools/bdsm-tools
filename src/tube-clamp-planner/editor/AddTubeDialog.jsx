import React from 'react';
import { Button, InputNumber, Modal, Radio, Space, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import ReactGA from 'react-ga4';
import useSceneStore from '../state/useSceneStore';

export default function AddTubeDialog({ parent, parentSlot, onAdd, options }) {
  const sceneStore = useSceneStore();

  const [open, setOpen] = React.useState(false);
  const [tube, setTube] = React.useState({});

  React.useEffect(() => {
    if (!open) {
      setTube({
        length: 0,
        type: 'tube',
        position: 0,
        slot: -1,
      });
    }
  }, [open]);

  return (
    <>
      <Modal
        open={open}
        okButtonProps={{
          disabled: (!!options && tube.slot < 0) || tube.length < 2,
        }}
        onOk={() => {
          const node = { ...tube };

          if (parentSlot !== 'middle') {
            delete node.position;
          }
          if (parentSlot !== 'end' || node.slot < 0) {
            delete node.slot;
          }

          onAdd({
            id: uuidv4(),
            node,
            parent,
            parentSlot,
            children: {
              middle: [],
              end: [],
            },
          }, Number(tube.slot));

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
          min={5}
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

        {!!options && (
          <>
            <br />
            <Typography>Pick a slot:</Typography>
            <Radio.Group
              value={Number(tube.slot)}
              onChange={({ target }) => setTube((old) => ({
                ...old,
                slot: Number(target.value),
              }))}
            >
              <Space direction='vertical'>
                {Object.entries(options).map(([option, populated]) => (
                  <Radio disabled={!!populated} value={Number(option)}>
                    Slot {option}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </>
        )}
      </Modal>
      <Button onClick={() => setOpen(true)}>Connect {parentSlot} tube</Button>
    </>
  );
}
