import React from 'react';
import {withJsonFormsCellProps} from '@jsonforms/react';
import {Checkbox} from 'antd';

function CheckboxCell(props) {
  const {data, className, id, enabled, visible, uischema, path, handleChange} = props;

  if (!visible) {
    return null;
  }
  return (
    <Checkbox
      checked={!!data}
      onChange={e => handleChange(path, e.target.checked)}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
    >
      {uischema.label}
    </Checkbox>
  );
}

export default withJsonFormsCellProps(CheckboxCell);