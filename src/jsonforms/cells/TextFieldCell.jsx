import React from 'react';
import {withJsonFormsControlProps} from '@jsonforms/react';
import {Input, Typography} from 'antd';
import _ from 'lodash';

function TextFieldCell(props) {
  const {
    config,
    data,
    className,
    id,
    enabled,
    uischema,
    schema,
    path,
    handleChange
  } = props;
  const maxLength = schema.maxLength;
  const appliedUiSchemaOptions = _.merge({}, config, uischema.options);
  return (
    <Typography>
      <Typography.Text>
        {uischema.label}
      </Typography.Text>
      <Input
        type='text'
        value={data || ''}
        onChange={ev => handleChange(path, ev.target.value)}
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

export default withJsonFormsControlProps(TextFieldCell);