import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers';
import antdRenderers from '../jsonforms/AntdRenderers';
import antdCells from '../jsonforms/AntdCells';

export default function Contract(props) {
    const { template } = props;
    const [data, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});
    return (
        <JsonForms
            schema={template.schema}
            uischema={template.uischema}
            renderers={[
                ...vanillaRenderers,
                ...antdRenderers,
            ]}
            cells={[
                ...vanillaCells,
                ...antdCells,
            ]}
            data={data}
            onChange={(errors, data) => {
                setErrors(errors);
                setData(data);
            }}
        />
    );
}