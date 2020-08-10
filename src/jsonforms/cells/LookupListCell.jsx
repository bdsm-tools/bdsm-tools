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
    <List
      dataSource={uischema.questions || []}
      bordered
      renderItem={(item, index) => (
        <List.Item>
          <Typography.Text>{item}</Typography.Text>
          <Radio.Group>
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
  );
}

export default withJsonFormsCellProps(LookupListCell);