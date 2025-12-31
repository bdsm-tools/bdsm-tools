import React from 'react';
import { Modal, Typography } from 'antd';
import MyBodyParts from './MyBodyParts';
import MyEquipment from './MyEquipment';

export default function SuggestPreferences() {
  const [open, setOpen] = React.useState(true);

  return (
    <Modal
      title='This tool is better if you set your preferences'
      open={open}
      okText='Continue'
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <Typography.Paragraph>
        Set some preferences to make this tool better for you or continue without
      </Typography.Paragraph>
      <MyBodyParts />
      <MyEquipment />
    </Modal>
  )
}
