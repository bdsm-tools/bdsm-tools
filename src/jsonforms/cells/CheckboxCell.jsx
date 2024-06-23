import React from 'react';
import { withJsonFormsCellProps } from '@jsonforms/react';
import { Checkbox } from 'antd';

function CheckboxCell(props) {
  const {
    data,
    className,
    id,
    enabled,
    visible,
    uischema,
    schema,
    path,
    handleChange,
  } = props;

  React.useEffect(() => {
    handleChange(path, !!schema.default);
  }, []);

  if (!visible) {
    return null;
  }
  return (
    <Checkbox
      checked={!!data}
      defaultChecked={!!schema.default}
      onChange={(e) => handleChange(path, e.target.checked)}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      style={uischema.style}
    >
      {uischema.label}
    </Checkbox>
  );
}

export default withJsonFormsCellProps(CheckboxCell);
