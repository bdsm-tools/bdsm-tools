import React from 'react';
import { withJsonFormsCellProps } from '@jsonforms/react';
import { Typography, List } from 'antd';

function LookupListReadOnlyCell(props) {
  const { data, uischema } = props;

  return (
    <div style={{ marginBottom: 50 }}>
      <Typography>
        <Typography.Paragraph>{uischema.label}</Typography.Paragraph>
      </Typography>
      <div style={{ marginLeft: 10, ...uischema.style }}>
        <List
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <Typography.Text style={{ maxWidth: '50%' }}>
                {uischema.questions[index]}
              </Typography.Text>
              <Typography.Text style={{ maxWidth: '50%' }}>
                {item}
              </Typography.Text>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default withJsonFormsCellProps(LookupListReadOnlyCell);
