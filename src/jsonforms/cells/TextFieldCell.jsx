import React from 'react';
import {withJsonFormsCellProps} from '@jsonforms/react';
import {Input, Typography} from 'antd';
import _ from 'lodash';

function TextFieldCell(props) {
  const {
    config,
    data,
    className,
    id,
    enabled,
    visible,
    uischema,
    schema,
    path,
    handleChange
  } = props;
  const maxLength = schema.maxLength;
  const appliedUiSchemaOptions = _.merge({}, config, uischema.options);

  const onChange = _.debounce(handleChange, 50);

  if (!visible) {
    return null;
  }
  return (
    <Typography>
      <Typography.Text>
        {uischema.label}
      </Typography.Text>
      <Input
        type='text'
        value={data || ''}
        onChange={ev => onChange(path, ev.target.value)}
        className={className}
        id={id}
        disabled={!enabled}
        autoFocus={appliedUiSchemaOptions.focus}
        maxLength={appliedUiSchemaOptions.restrict ? maxLength : undefined}
        size={appliedUiSchemaOptions.trim ? maxLength : undefined}
      />
    </Typography>
  );
}

export default withJsonFormsCellProps(TextFieldCell);