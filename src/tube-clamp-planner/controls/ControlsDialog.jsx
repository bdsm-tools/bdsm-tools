import React from 'react';
import { Avatar, Button, List, Modal, Typography } from 'antd';
import { intersperse } from '../../util';

const controls = [
  {
    title: 'Movement Controls',
    description:
      'Controls to move the camera around the scene. This also moves the focus point',
    controls: [
      {
        key: 'W',
        description: 'Move the camera forwards',
      },
      {
        key: 'A',
        description: 'Move the camera left',
      },
      {
        key: 'S',
        description: 'Move the camera backwards',
      },
      {
        key: 'D',
        description: 'Move the camera right',
      },
      {
        key: 'alt + W',
        description: 'Move the camera up',
      },
      {
        key: 'alt + S',
        description: 'Move the camera down',
      },
    ],
  },
  {
    title: 'Orbit Controls',
    description: 'Controls that orbit the camera around the focus point',
    controls: [
      {
        key: 'Q',
        description: 'Rotate the camera left around the focus point',
      },
      {
        key: 'E',
        description: 'Rotate the camera right around the focus point',
      },
      {
        key: 'alt + Q',
        description: 'Rotate the camera down around the focus point',
      },
      {
        key: 'alt + E',
        description: 'Rotate the camera up around the focus point',
      },
      {
        key: '+',
        description: 'Zoom the camera in to the focus point',
      },
      {
        key: '-',
        description: 'Zoom the camera out from the focus point',
      },
    ],
  },
  {
    title: 'Orbit Controls',
    controls: [],
  },
  {
    title: 'Misc Controls',
    controls: [],
  },
];

export default function ControlsDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Controls</Button>
      <Modal
        title='Controls'
        open={open}
        onCancel={() => setOpen(false)}
        cancelText='Close'
        okButtonProps={{ style: { display: 'none' } }}
        width={640}
      >
        {controls.map((controlGroup) => (
          <React.Fragment key={controlGroup.title}>
            <Typography>{controlGroup.title}</Typography>
            <Typography.Text type='secondary'>
              {controlGroup.description}
            </Typography.Text>
            <List
              style={{ marginBottom: 50 }}
              dataSource={controlGroup.controls}
              renderItem={(item) => (
                <List.Item key={item.key}>
                  <List.Item.Meta
                    avatar={
                      <div className='flex' style={{ alignItems: 'center' }}>
                        {intersperse(
                          item.key.split('+').map((key) => (
                            <Avatar key={key} shape='square'>
                              {key.trim()}
                            </Avatar>
                          )),
                          <Typography style={{ margin: 5 }}>+</Typography>,
                        )}
                      </div>
                    }
                    title={item.description}
                    description={
                      <Typography>
                        Hold <Typography.Text keyboard>shift</Typography.Text>{' '}
                        to increase the speed or{' '}
                        <Typography.Text keyboard>ctrl</Typography.Text> to
                        decrease the speed
                      </Typography>
                    }
                  />
                </List.Item>
              )}
            />
          </React.Fragment>
        ))}
      </Modal>
    </>
  );
}
