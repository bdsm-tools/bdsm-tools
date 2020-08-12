import React from 'react';
import { withJsonFormsEnumCellProps} from '@jsonforms/react';
import {Select, Typography} from 'antd';

function SelectionCell(props) {
  const {data, className, id, enabled, visible, schema, uischema, path, handleChange} = props;

  if (!visible) {
    return null;
  }
  return (
    <React.Fragment>
      <Typography>
        <Typography.Text>
          {uischema.label}
        </Typography.Text>
      </Typography>
      <Select
        className={className}
        id={id}
        disabled={!enabled}
        autoFocus={uischema.options && uischema.options.focus}
        value={data || ''}
        onChange={value => handleChange(path, value)}
        style={{ width: '100%' }}
      >
        {/*<Select.Option value="" label="">{''}</Select.Option>*/}
        {(schema.options || []).map(optionValue => (
          <Select.Option value={optionValue} label={optionValue} key={optionValue}>
            {optionValue}
          </Select.Option>
        ))}
      </Select>
    </React.Fragment>
  );
}

export default withJsonFormsEnumCellProps(SelectionCell);