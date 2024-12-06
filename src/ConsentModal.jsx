import React from 'react';
import Cookies from 'js-cookie';
import { Typography, Modal } from 'antd';
import ReactGA from 'react-ga4';

const cookieName = 'consent';
export default function ConsentModal() {
  const [consent, setConsent] = React.useState(Cookies.get(cookieName));
  const onConsent = () => {
    ReactGA.event('consent');
    Cookies.set(cookieName, true);
    setConsent(true);
  };
  return (
    <Modal
      title='Content Warning'
      open={!consent}
      okText='I Agree'
      cancelText='I Do Not Agree'
      onOk={onConsent}
      onCancel={() => {
        ReactGA.event('non_consent');
        window.location = 'https://google.com';
      }}
      centered
      maskClosable={false}
      keyboard={false}
    >
      <Typography>
        <Typography.Paragraph>
          This site depicts and references BDSM and sexual activities that may
          not be suitable for everyone. If you are NOT of the legal age to
          consent or it is illegal to access this type of material in your area,
          please leave immediately.
        </Typography.Paragraph>
        <Typography.Paragraph>
          The type of content you may see:
          <ul>
            <li>Explicit Language</li>
            <li>Explicit References to Sexual Organs</li>
            <li>References to Sexual Activities</li>
            <li>References to BDSM Activities</li>
          </ul>
        </Typography.Paragraph>
        <Typography.Paragraph type='warning'>
          By clicking 'I Agree' you are stating that you are permitted to access
          this type of material in accordance with your local laws. You also
          understand the type of content you may see on this site.
        </Typography.Paragraph>
      </Typography>
    </Modal>
  );
}
