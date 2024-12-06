import React from 'react';
import { withJsonFormsCellProps } from '@jsonforms/react';
import { Typography } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const processData = (type) => (data) => {
  switch (type) {
    case 'boolean':
      return data ? (
        <CheckCircleOutlined style={{ color: 'green' }} />
      ) : (
        <CloseCircleOutlined style={{ color: 'red' }} />
      );
    case 'object':
      if (Array.isArray(data)) {
        return data.map(processData('string'));
      }
      return Object.keys(data).map(processData('string'));
    case 'string':
    case 'number':
    default:
      return data;
  }
};

function GenericReadOnlyCell(props) {
  const { data, uischema, schema } = props;

  return (
    <div style={{ marginBottom: 50 }}>
      <Typography>
        <Typography.Paragraph>{uischema.label}</Typography.Paragraph>
        <Typography.Paragraph style={{ marginLeft: 10 }}>
          {processData(schema.type)(data) || '<No Answer Given>'}
        </Typography.Paragraph>
      </Typography>
    </div>
  );
}

export default withJsonFormsCellProps(GenericReadOnlyCell);
