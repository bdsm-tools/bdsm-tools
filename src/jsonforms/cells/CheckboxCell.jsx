import React from 'react';
import {withJsonFormsControlProps} from '@jsonforms/react';
import {Checkbox} from 'antd';

function CheckboxCell(props) {
  const {data, className, id, enabled, uischema, path, handleChange} = props;

  return (
    <Checkbox
      checked={!!data}
      onChange={ev => handleChange(path, ev.target.checked)}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
    >
      {uischema.label}
    </Checkbox>
  );
}

export default withJsonFormsControlProps(CheckboxCell);