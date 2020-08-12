import React from 'react';
import { useLocation } from 'react-router-dom';
import {Button, Modal} from "antd";
import {JsonForms} from '@jsonforms/react';
import {vanillaRenderers, vanillaCells} from '@jsonforms/vanilla-renderers';
import AntdRenderers from '../jsonforms/AntdRenderers';
import AntdCells from '../jsonforms/AntdCells';
import ReadOnlyCells from '../jsonforms/ReadOnlyCells';
import CustomCells from '../jsonforms/CustomCells';
import api from '../services/scene-negotiation-api';
import ShareForm from "./ShareForm";

function fetchData({ id, setData, setTemplate }) {
  return api.getNegotiation(id).then(({ data, template }) => {
    if (data && template) {
      // api.getNegotiationType(template)
      //   .then(setTemplate);

      setData(data);
    }
  });
}

function NegotiationForm(props) {
  const [template, setTemplate] = React.useState(props.template);
  const [data, setData] = React.useState({});
  const [errors, setErrors] = React.useState([]);
  const [submit, setSubmit] = React.useState(false);
  const [readOnly, setReadOnly] = React.useState(false);
  const { search } = props.location;

  React.useEffect(() => {
    setTemplate(props.template);
  }, [props.template]);

  React.useEffect(() => {
    const params = new URLSearchParams(search);
    const sourceId = params.get('source');
    const id = params.get('id');

    if (id) {
      fetchData({ id, setData, setTemplate })
        .then(() => setReadOnly(true));
    } else if (sourceId) {
      api.getNegotiation(sourceId).then(source => {
        setData(source.data);
      });
    }
  }, [search]);

  const readOnlyCells = [
    ...ReadOnlyCells,
  ];
  const editableCells = [
    ...vanillaCells,
    ...AntdCells,
    ...CustomCells,
  ];
  if (!template) {
    return null;
  }

  return (
    <div style={{ marginBottom: '10px', width: '50vw' }}>
      <JsonForms
        schema={template.schema || {}}
        uischema={template.uischema || {}}
        renderers={[
          ...vanillaRenderers,
          ...AntdRenderers,
        ]}
        cells={readOnly ? readOnlyCells : editableCells}
        data={data}
        onChange={readOnly ? undefined : (form) => {
          setData(form.data);
          setErrors(form.errors);
        }}
      />
      {!readOnly &&
        <Button
          type="primary"
          shape="round"
          size="large"
          style={{ marginTop: 20, width: '100%' }}
          onClick={() => setSubmit(true)}
        >
          Complete Negotiation
        </Button>
      }
      <Modal
        visible={submit}
        onCancel={() => setSubmit(false)}
        footer={null}
      >
        <ShareForm
          data={data}
          errors={errors}
          template={template.id}
        />
      </Modal>
    </div>
  );
}

export default NegotiationForm;