import React from 'react';
import { Modal, Button, Typography, List } from 'antd';
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { alphabeticalSort } from '../util';
import Cookies from 'js-cookie';
import ReactGA from 'react-ga4';

export const equipment = [
  {
    label: 'Ass Hook',
    value: 'ass hook',
  },
  {
    label: 'Ratchet winch',
    value: 'ratchet winch',
  },
  {
    label: 'Wrist restraints',
    value: 'wrist restraints',
  },
  {
    label: 'Over the door fixture',
    value: 'over the door fixture',
  },
  {
    label: 'Collar with an O-ring',
    value: 'collar with an o-ring',
  },
  {
    label: 'Blindfold',
    value: 'blindfold',
  },
  {
    label: 'Open mouth Gag',
    value: 'open mouth gag',
  },
  {
    label: 'Dominant Outfit',
    value: 'dominant outfit',
  },
  {
    label: 'Nipple clamps',
    value: 'nipple clamps',
  },
  {
    label: 'Ankle restraints',
    value: 'ankle restraints',
  },
  {
    label: 'Spreader Bar',
    value: 'spreader bar',
  },
  {
    label: 'Equipment to punish/pleasure the Slave’s genitals',
    value: 'genital punishment tool',
  },
  {
    label: 'Edge-O-Matic (or equivalent), with associated equipment',
    value: 'edge-o-matic',
  },
  {
    label: 'Belts or straps',
    value: 'belts or straps',
  },
  {
    label: 'Gag',
    value: 'gag',
  },
  {
    label: 'Extra restraints',
    value: 'extra restraints',
  },
  {
    label: 'Butt plug',
    value: 'butt plug',
  },
  {
    label: 'Cock Sling',
    value: 'cock sling',
  },
  {
    label: 'Impact Toys',
    value: 'impact toys',
  },
  {
    label: 'Milking Machine',
    value: 'milking machine',
  },
  {
    label: 'Collar with leash',
    value: 'collar with leash',
  },
  {
    label: 'Cock cage',
    value: 'cock cage',
  },
  {
    label: 'Vibrator',
    value: 'vibrator',
  },
  {
    label: 'Double sided penis gag',
    value: 'double sided penis gag',
  },
  {
    label: 'Rope',
    value: 'rope',
  },
  {
    label: 'Open mouth harness gag',
    value: 'open mouth harness gag',
  },
  {
    label: 'Dildo',
    value: 'dildo',
  },
  {
    label: 'Sexy Outfit',
    value: 'sexy outfit',
  },
  {
    label: 'Ball Gag',
    value: 'ball gag',
  },
].sort(alphabeticalSort(({ label }) => label));

export default function MyEquipment() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      ReactGA.event('view_my_equipment');
    }
  }, [open]);

  const [myEquipment, setMyEquipment] = React.useState(
    (Cookies.get('my-equipment') || '').split('|'),
  );
  const [missingEquipment, setMissingEquipment] = React.useState(
    (Cookies.get('missing-equipment') || '').split('|'),
  );

  React.useEffect(
    () =>
      void Cookies.set('my-equipment', myEquipment.filter(Boolean).join('|'), {
        SameSite: 'Lax',
        Domain: '.bdsmtools.org',
      }),
    [myEquipment],
  );
  React.useEffect(
    () =>
      void Cookies.set(
        'missing-equipment',
        missingEquipment.filter(Boolean).join('|'),
        { SameSite: 'Lax', Domain: '.bdsmtools.org' },
      ),
    [missingEquipment],
  );

  const add = (value) => {
    ReactGA.event('add_equipment', { value });
    setMyEquipment((old) => [...old, value]);
    setMissingEquipment((old) => old.filter((a) => a !== value));
  };
  const remove = (value) => {
    ReactGA.event('remove_equipment', { value });
    setMyEquipment((old) => old.filter((a) => a !== value));
    setMissingEquipment((old) => [...old, value]);
  };

  const EquipmentItem = ({ label, value }) => {
    const actions = [];
    if (!myEquipment.includes(value) || missingEquipment.includes(value)) {
      actions.push(
        <Button icon={<PlusSquareOutlined />} onClick={() => add(value)}>
          I have
        </Button>,
      );
    }
    if (myEquipment.includes(value) || !missingEquipment.includes(value)) {
      actions.push(
        <Button icon={<MinusSquareOutlined />} onClick={() => remove(value)}>
          I don't have
        </Button>,
      );
    }
    return (
      <List.Item actions={actions}>
        <Typography.Text>{label || value}</Typography.Text>
      </List.Item>
    );
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>My Equipment</Button>
      <Modal
        title='My Equipment'
        width='75%'
        open={open}
        okText='Done'
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
        styles={{
          body: { overflowY: 'scroll' },
          content: { height: 'calc(100vh - 150px)' },
        }}
      >
        <Typography.Paragraph>
          Let us know what equipment you have so we can tailor the tools to what
          you have.
        </Typography.Paragraph>
        <List
          header='My Equipment'
          dataSource={equipment.filter(({ value }) =>
            myEquipment.includes(value),
          )}
          bordered
          renderItem={EquipmentItem}
        />
        <br />
        <List
          header='Equipment Pool'
          dataSource={equipment.filter(
            ({ value }) =>
              !myEquipment.includes(value) && !missingEquipment.includes(value),
          )}
          bordered
          renderItem={EquipmentItem}
        />
        <br />
        <List
          header='Missing Equipment'
          dataSource={equipment.filter(({ value }) =>
            missingEquipment.includes(value),
          )}
          bordered
          renderItem={EquipmentItem}
        />
      </Modal>
    </>
  );
}
