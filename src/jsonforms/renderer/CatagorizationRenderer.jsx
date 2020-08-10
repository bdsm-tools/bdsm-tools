import React from 'react';
import {ResolvedJsonFormsDispatch, withJsonFormsLayoutProps} from '@jsonforms/react';
import { Tabs } from "antd";

function CategorizationRenderer(props) {
  const { schema, uischema, path } = props;

  return (
    <Tabs>
      {(uischema || []).elements.map((el) => (
        <Tabs.TabPane tab={el.label} key={el.label}>
          {(el || []).elements.map((child, index) => (
            <ResolvedJsonFormsDispatch
              key={`${path}-${index}`}
              uischema={child}
              schema={schema}
              path={path}
            />
          ))}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}

export default withJsonFormsLayoutProps(CategorizationRenderer);
