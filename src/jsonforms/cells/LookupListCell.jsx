import React from 'react';
import {withJsonFormsCellProps} from '@jsonforms/react';
import {List, Typography, Radio} from 'antd';

function LookupListCell(props) {
  const {data, uischema, path, handleChange, enabled, visible } = props;

  const responses = data || [];
  const click = (index) => (e) => {
    responses[index] = e.target.value;
    handleChange(path, responses);
  };

  if (!visible) {
    return null;
  }

  return (
    <div style={{ marginBottom: 50 }}>
      <Typography>
        <Typography.Paragraph>
          {uischema.label}
        </Typography.Paragraph>
      </Typography>
      <div style={{ marginLeft: 10, ...uischema.style }}>
        <List
          dataSource={uischema.questions || []}
          bordered
          renderItem={(item, index) => (
            <List.Item>
              <Typography.Text style={{ maxWidth: '50%' }}>{item}</Typography.Text>
              <Radio.Group style={{ maxWidth: '50%' }}>
                {(uischema.answers || []).map((answer) => (
                  <Radio.Button
                    key={answer}
                    value={answer}
                    onClick={click(index)}
                    disabled={!enabled}
                  >
                    {answer}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default withJsonFormsCellProps(LookupListCell);