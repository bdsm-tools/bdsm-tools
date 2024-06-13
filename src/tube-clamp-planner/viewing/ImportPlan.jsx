import React from 'react'
import { Button, Modal, Typography, Upload, message } from 'antd'
import { useLocalStorageState } from 'ahooks'
import InboxOutlined from '@ant-design/icons/InboxOutlined'

export default function ImportPlan ({ onImport }) {
  const [open, setOpen] = React.useState(false)
  const [scene, setScene] = React.useState();
  const [file, setFile] = React.useState([]);
  const [localStore, setLocalStore] = useLocalStorageState(`tube-plan-${scene?.id}`)

  const onClose = () => {
    setFile([]);
    setScene(undefined);
    setOpen(false);
  };

  const create = () => {
    setLocalStore(scene);
    onImport(scene.id);
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
          disabled={!!scene}
          beforeUpload={(selectedFile) => {
            (async () => {
              const uploadScene = JSON.parse(await selectedFile.text());
              if (localStorage.getItem(`tube-plan-${uploadScene.id}`)) {
                Modal.warning({
                  title: 'Careful!',
                  content: 'This Tube Plan already exists locally, by continuing you may be overwriting any changes made since you downloaded the file.',
                });
              }
              setScene(uploadScene);
              setFile([selectedFile]);
            })();
            return false;
          }}
          fileList={file}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
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