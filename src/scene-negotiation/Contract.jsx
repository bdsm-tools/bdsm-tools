import React from 'react';
import { useLocation } from 'react-router-dom';
import {JsonForms} from '@jsonforms/react';
import {vanillaRenderers, vanillaCells} from '@jsonforms/vanilla-renderers';
import antdRenderers from '../jsonforms/AntdRenderers';
import antdCells from '../jsonforms/AntdCells';
import customCells from '../jsonforms/CustomCells';
import api from '../services/scene-negotiation-api';

function fetchData({ id, setData, setTemplate, setErrors }) {
  api.getNegotiation(id).then(({ data, template }) => {
    if (data && template) {
      setData(data);
      api.getNegotiationType(template)
        .then(setTemplate);
    }
  });
}

function Contract(props) {
  const [template, setTemplate] = React.useState(props.template);
  const [data, setData] = React.useState({});
  const [errors, setErrors] = React.useState([]);
  const { search } = useLocation();

  React.useEffect(() => {
    setTemplate(props.template);
  }, [props.template]);

  React.useEffect(() => {
    const params = new URLSearchParams(search);
    const sourceId = params.get('source');
    const id = params.get('id');
    if (id) {
      fetchData({ id, setData, setTemplate, setErrors });
    }
    else if (sourceId) {
      api.getNegotiation(sourceId).then(source => {
        setData(source.data);
      });
    }
  }, [search]);

  console.log(data);
  return (
    <JsonForms
      schema={template.schema || {}}
      uischema={template.uischema || {}}
      renderers={[
        ...vanillaRenderers,
        ...antdRenderers,
      ]}
      cells={[
        ...vanillaCells,
        ...antdCells,
        ...customCells,
      ]}
      data={data}
      onChange={(form) => setData(form.data)}
    />
  );
}

export default Contract;