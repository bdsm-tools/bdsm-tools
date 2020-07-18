import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Select } from 'antd';

function SelectionCell(props) {
    const { data, className, id, enabled, uischema, path, handleChange, options } = props;

    return (
        <Select
            className={className}
            id={id}
            disabled={!enabled}
            autoFocus={uischema.options && uischema.options.focus}
            value={data || ''}
            onChange={ev => handleChange(path, ev.target.value)}
        >
            {options.map(optionValue => (
                <Select.Option value={optionValue} label={optionValue} key={optionValue}>
                    {optionValue}
                </Select.Option>
            ))}
        </Select>
    );
}

export default withJsonFormsControlProps(SelectionCell);