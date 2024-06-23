import React from 'react';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { Typography } from 'antd';

function ParagraphRenderer(props) {
  const { visible, uischema } = props;

  if (!visible) {
    return null;
  }
  const SubType = Typography[uischema.subtype] || Typography.Text;
  return (
    <Typography>
      <SubType {...(uischema.props || {})}>{uischema.text}</SubType>
    </Typography>
  );
}

export default withJsonFormsLayoutProps(ParagraphRenderer);
