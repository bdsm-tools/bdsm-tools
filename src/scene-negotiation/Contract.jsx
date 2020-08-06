import React from 'react';
import { useLocation } from 'react-router-dom';
import {JsonForms} from '@jsonforms/react';
import {vanillaRenderers, vanillaCells} from '@jsonforms/vanilla-renderers';
import antdRenderers from '../jsonforms/AntdRenderers';
import antdCells from '../jsonforms/AntdCells';
import api from '../services/api';

const Wrapper = (props) => {
  const [data, setData] = React.useState({});
  const [template, setTemplate] = React.useState({});
  React.useEffect(() => {
    api.getContract(props.id).then(({ data, templateId }) => {
      setData(data);
      api.getContractType(templateId)
        .then(setTemplate);
    });
  }, []);
  return (
    <Contract {...props} template={template} data={data} />
  )
}

function fetchData({ id, setData, setTemplate }) {
  api.getContract(id).then(({ data, templateId }) => {
    setData(data);
    api.getContractType(templateId)
      .then(setTemplate);
  });
}

function Contract(props) {
  const [template, setTemplate] = React.useState(props.template);
  const [data, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const { search } = useLocation();

  React.useEffect(() => {
    setTemplate(props.template);
  }, [props.template]);

  React.useEffect(() => {
    const params = new URLSearchParams(search);
    const sourceId = params.get('source');
    const id = params.get('id');
    if (id) {
      fetchData({ id, setData, setTemplate });
    }
    else if (sourceId) {
      api.getContract(sourceId).then(source => {
        setData(source.data);
      });
    }
  }, [search]);

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

export default Contract;