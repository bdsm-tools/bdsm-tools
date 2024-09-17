import React from 'react';
import { useUpdateCheck } from 'react-update-notification';
import { Button, notification } from 'antd';
import ReactGA from 'react-ga4';

const key = 'update';
export default function UpdateChecker () {

  const { status, reloadPage } = useUpdateCheck({
    type: 'interval',
    interval: 3600000,
  });

  React.useEffect(() => {
    if (!(status === 'checking' || status === 'current')) {
      notification.warn({
        message: 'New version available',
        description: `
          You're using an old version of BDSM Tools. Not updating may cause 
          unknown errors to occur. Plus, it means there's probably new features
          you're missing out on.
        `,
        placement: 'bottomRight',
        duration: 0,
        key,
        btn: (
          <Button
            type="primary"
            size="small"
            onClick={() => {
              ReactGA.event('new_version_reload');
              notification.close(key);
              reloadPage();
            }}
          >
            Update now!
          </Button>
        ),
      });
    }
  }, [status]);

  return null;
}
