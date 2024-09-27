import React from 'react';
import { Button, Modal, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorageState } from 'ahooks';
import ReactGA from 'react-ga4';
import SceneControls from '../controls/SceneControls';

const defaultScene = () => ({
  id: uuidv4(),
  version: 1,
  title: 'My Tube Plan',
  width: 350,
  length: 300,
  height: 240,
  brightness: 0.75,
  chains: [],
});

export default function CreatePlan({ onCreate }) {
  const [open, setOpen] = React.useState(false);
  const [scene, setScene] = React.useState(defaultScene());
  const [localStore, setLocalStore] = useLocalStorageState(
    `tube-plan-${scene.id}`,
  );

  const onClose = () => {
    setScene(defaultScene());
    setOpen(false);
  };

  const create = () => {
    setLocalStore(scene);
    onCreate(scene.id);

    ReactGA.event('create_tube_plan', {
      title: scene.title,
      width: scene.width,
      length: scene.length,
      height: scene.height,
      brightness: scene.brightness,
    });

    onClose();
  };

  return (
    <>
      <Button style={{ margin: 10 }} onClick={() => setOpen(true)}>
        New Design
      </Button>
      <Modal
        open={open}
        title='Create new Tube Plan'
        okText='Create'
        onOk={create}
        onCancel={onClose}
      >
        <SceneControls
          scene={scene}
          setScene={(data) => setScene((old) => ({ ...old, ...data }))}
          basicOnly
        />
        <div style={{ marginTop: 40, marginBottom: -20 }}>
          <Typography.Text type='secondary'>
            You can change all these values later
          </Typography.Text>
        </div>
      </Modal>
    </>
  );
}
