import React from 'react';
import {withJsonFormsControlProps} from '@jsonforms/react';
import {Checkbox} from 'antd';

function LookupListCell(props) {
  const {data, className, id, enabled, uischema, path, handleChange} = props;

  return 'LookupListCell';
}

export default withJsonFormsControlProps(LookupListCell);