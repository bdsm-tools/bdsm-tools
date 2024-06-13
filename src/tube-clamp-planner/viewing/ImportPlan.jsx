import React from 'react';
import { Button, Modal, Typography, Upload } from 'antd'
import { useLocalStorageState } from 'ahooks'
import InboxOutlined from '@ant-design/icons/InboxOutlined';

export default function ImportPlan({ onCreate }) {
  const [open, setOpen] = React.useState(false);
  const [scene, setScene] = React.useState();
  const [localStore, setLocalStore] = useLocalStorageState(`tube-plan-${scene?.id}`);

  const onClose = () => {
    setScene(undefined);
    setOpen(false);
  };

  const create = () => {
    setLocalStore(scene);
    onCreate(scene.id);
    onClose();
  };

  return (
    <>
      <Button style={{ margin: 10 }} onClick={() => setOpen(true)}>
        Import Design
      </Button>
      <Modal
        open={open}
        title='Import a Tube Plan'
        okText='Import'
        okButtonProps={{
          disabled: !scene,
        }}
        onOk={create}
        onCancel={onClose}
      >
        <Upload.Dragger
          name='import-tube-design'
          multiple={false}
          accept='.tube'
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag a file to this area to upload</p>
          <p className="ant-upload-hint">
            Downloaded plans will appear in your Downloads folder and have a .tube extension
          </p>
        </Upload.Dragger>
      </Modal>
    </>
  )
}