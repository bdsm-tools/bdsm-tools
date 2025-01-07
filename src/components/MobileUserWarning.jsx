import React from 'react';
import {isMobile} from 'react-device-detect';
import { Modal } from 'antd';
import { useCookieState } from 'ahooks';
import { P } from './Text';

export default function MobileUserWarning() {
  const [ack, setAck] = useCookieState('mobile-warning-ack', { defaultValue: 'false' });
  const [consent] = useCookieState('consent', { defaultValue: 'false' });

  return (
    <Modal
      open={isMobile && consent === 'true' && ack !== 'true'}
      title='Warning Mobile User!'
      okText='Continue anyway'
      onOk={() => setAck('true')}
      cancelButtonProps={{ style: { display: 'none' } }}
      centered
    >
      <P>
        We've detected that you are using a mobile device.
      </P>

      <P>
        This site is not designed for mobile devices and the controls will likely not work. Please
        consider using a desktop or laptop computer for the best experience.
      </P>

      <P>
        If you would like to continue anyway, you can click the button below but consider the following:
      </P>
      <ul>
        <li>Flip the device to landscape to get more space</li>
        <li>Stick to the tools that only require text input and button clicks</li>
      </ul>
    </Modal>
  )
}