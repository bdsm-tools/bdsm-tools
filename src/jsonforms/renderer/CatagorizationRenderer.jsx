import React from 'react';
import {ResolvedJsonFormsDispatch, withJsonFormsLayoutProps} from '@jsonforms/react';
import { Tabs, Button, Divider } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

function CategorizationRenderer(props) {
  const { schema, uischema, path } = props;
  const [key, setKey] = React.useState();
  return (
    <Tabs className="fillable" activeKey={key} onChange={setKey}>
      {(uischema.elements || []).map((el, i) => (
        <Tabs.TabPane tab={el.label} key={el.label}>
          {(el.elements || []).map((child, index) => (
            <div key={`${path}-${index}`} className="container">
              <div style={{ overflowY: 'scroll', height: '30vh', marginBottom: 60 }}>
                <ResolvedJsonFormsDispatch
                  uischema={child}
                  schema={schema}
                  path={path}
                />
              </div>
              <div className="bottom">
                <Divider />
                <div className="action-buttons">
                  <Button
                    disabled={i < 1}
                    onClick={() => setKey(uischema.elements[i - 1].label)}
                  >
                    <ArrowLeftOutlined />
                    Previous Section
                  </Button>
                  <Button
                    disabled={!uischema.elements[i + 1]}
                    onClick={() => setKey(uischema.elements[i + 1].label)}
                  >
                    Next Section
                    <ArrowRightOutlined />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}

export default withJsonFormsLayoutProps(CategorizationRenderer);
