import React from 'react';
import {Button, Modal, Popconfirm, Skeleton} from "antd";
import {JsonForms} from '@jsonforms/react';
import {vanillaRenderers, vanillaCells} from '@jsonforms/vanilla-renderers';
import AntdRenderers from '../jsonforms/AntdRenderers';
import AntdCells from '../jsonforms/AntdCells';
import ReadOnlyCells from '../jsonforms/ReadOnlyCells';
import CustomCells from '../jsonforms/CustomCells';
import api from '../services/scene-negotiation-api';
import ShareForm from "./ShareForm";

function NegotiationForm(props) {
  const [template, setTemplate] = React.useState(props.template);
  const [data, setData] = React.useState({});
  const [errors, setErrors] = React.useState([]);
  const [submit, setSubmit] = React.useState(false);
  const [readOnly, setReadOnly] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { search } = props.location;
  const { push } = props.history;

  const fetchData = (id) => {
    return api.getNegotiation(id).then(({ data, template }) => {
      if (data && template) {
        // api.getNegotiationType(template)
        //   .then(setTemplate);

        setData(data);
      }
    });
  };

  React.useEffect(() => {
    window.sceenNegotiation = {
      setReadOnly,
      setLoading,
    };
    return () => delete window.sceenNegotiation;
  }, [setReadOnly]);

  React.useEffect(() => {
    setTemplate(props.template);
  }, [props.template]);

  React.useEffect(() => {
    const params = new URLSearchParams(search);
    const sourceId = params.get('source');
    const id = params.get('id');

    if (id) {
      setLoading(true);
      fetchData(id)
        .then(() => {
          setReadOnly(true);
          setLoading(false);
        });
    } else if (sourceId) {
      setLoading(true);
      fetchData(sourceId)
        .then(() => {
          setReadOnly(false);
          setLoading(false);
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

  if (loading) {
    return (
      <React.Fragment>
        <Skeleton active size="large"/>
        <Skeleton active size="large"/>
        <Skeleton active size="large"/>
      </React.Fragment>
    );
  }

  return (
    <div
      id="scene-negotiation-container"
      className="tool-container fillable"
      style={{ width: '50vw' }}
    >
      <div id="jsonforms-container" className="fillspace">
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
      </div>
      {!readOnly &&
        <Button
          type="primary"
          shape="round"
          size="large"
          style={{ margin: '20px 0px', width: '100%' }}
          onClick={() => setSubmit(true)}
        >
          Complete Negotiation
        </Button>
      }
      {readOnly &&
        <Popconfirm
          title="Are you sure you want to modify? You will not modify this data, only copy it to a new form"
          placement="top"
          onConfirm={() => {
            const params = new URLSearchParams(search);
            const id = params.get('id');

            push({
              search: `?source=${id}`,
            });
          }}
        >
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ marginTop: 20, width: '100%' }}
          >
            Modify Negotiation
          </Button>
        </Popconfirm>
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