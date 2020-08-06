import React from 'react';
import {withJsonFormsControlProps, withJsonFormsEnumCellProps} from '@jsonforms/react';
import {Select} from 'antd';

function SelectionCell(props) {
  const {data, className, id, enabled, schema, uischema, path, handleChange, options} = props;

  return (
    <Select
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      value={data || ''}
      onChange={value => handleChange(path, value)}
      style={{ width: '100%' }}
    >
      <Select.Option value="" label="">{''}</Select.Option>
      {(schema.options || []).map(optionValue => (
        <Select.Option value={optionValue} label={optionValue} key={optionValue}>
          {optionValue}
        </Select.Option>
      ))}
    </Select>
  );
}

export default withJsonFormsEnumCellProps(SelectionCell);