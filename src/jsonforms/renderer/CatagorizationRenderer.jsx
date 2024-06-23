import React from 'react';
import {
  ResolvedJsonFormsDispatch,
  withJsonFormsLayoutProps,
} from '@jsonforms/react';
import { Tabs, Button, Divider } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const size = 'calc(100vh - 359px)';
const contentStyle = {
  height: size,
  maxHeight: size,
};

function CategorizationRenderer(props) {
  const { schema, uischema, path } = props;
  const [key, setKey] = React.useState();
  return (
    <Tabs
      className='full'
      activeKey={key}
      onChange={setKey}
      items={(uischema.elements || []).map((el, i) => ({
        key: el.label,
        label: el.label,
        children: (
          <>
            <div className='scroll' style={contentStyle}>
              {(el.elements || []).map((child, index) => (
                <div key={`${path}-${index}`}>
                  <ResolvedJsonFormsDispatch
                    uischema={child}
                    schema={schema}
                    path={path}
                  />
                </div>
              ))}
            </div>
            <div>
              <Divider />
              <div className='action-buttons'>
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
          </>
        ),
      }))}
    />
  );
}

export default withJsonFormsLayoutProps(CategorizationRenderer);
