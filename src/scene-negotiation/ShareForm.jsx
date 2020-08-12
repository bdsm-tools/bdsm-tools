import React from 'react';
import { Result, Typography, Button, Alert } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import api from '../services/scene-negotiation-api';

export default function ShareForm({ data, errors, template }) {
  const { pathname } = useLocation();
  const { replace } = useHistory();
  const [saving, setSaving] = React.useState(false);
  const [link, setLink] = React.useState(undefined);

  const generateLink = (id) =>
    `${document.location.origin}${pathname}?id=${id}`;

  const save = () => {
    setSaving(true);
    api.saveNegotiation({ data, template }).then(res => {
      setLink(generateLink(res.id));
      setSaving(false);
      replace({
        search: `?id=${res.id}`,
      });
    }).catch(() => {
      setSaving(false);
    });
  }
  if (!errors || errors.length < 1) {
    return (
      <Result
        title="You've completed the Negotiation. Time to Share!"
        subTitle={
          "If you want to save your Negotiation you must click" +
          "the button to generate the sharable link."
        }
        status="success"
        extra={(
          <React.Fragment>
            <Typography>
              <Typography.Paragraph type="warning">
                Generating the link will allow anyone with it to view
                the data you&aposve entered. You will be unable to delete
                it once you&aposve generated the link.
              </Typography.Paragraph>
            </Typography>
            {!!link &&
              <Typography>
                <Typography.Link style={{ textColor: '#2525f1' }}>
                  {link}
                </Typography.Link>
              </Typography>
            }
            {!link &&
              <Button type="primary" loading={saving} onClick={save}>
                Generate Link
              </Button>
            }
          </React.Fragment>
        )}
      />
    );
  }

  const messages = {
    'required': 'A question requires an answer',
  };
  errors.forEach((error, index) => console.log(`Error ${index + 1}`, error));
  return (
    <Result
      title="You've made some errors!"
      subTitle="You will need to fix all the issues before submitting:"
      status="error"
      extra={(
        <React.Fragment>
          {errors.map(({ keyword, message, dataPath }) => (
            <Typography key={[keyword, message, dataPath].concat('__')}>
              <Typography.Paragraph>
                <Alert
                  message={messages[keyword]}
                  description={`'${dataPath}' ${message}`}
                  type="error"
                  showIcon
                />
              </Typography.Paragraph>
            </Typography>
          ))}
        </React.Fragment>
      )}
    />
  );
}