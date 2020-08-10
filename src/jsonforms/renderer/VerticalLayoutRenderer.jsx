import React from 'react';
import { ResolvedJsonFormsDispatch, withJsonFormsLayoutProps} from '@jsonforms/react';

function VerticalLayoutRenderer(props) {
  const { schema, uischema, path } = props;
  return (
    <div style={{ maxWidth: uischema.width }}>
      {(uischema || []).elements.map((child, index) => (
        <div key={child.label} style={{ marginBottom: 20 }}>
          <ResolvedJsonFormsDispatch
            key={`${path}-${index}`}
            uischema={child}
            schema={schema}
            path={path}
          />
        </div>
      ))}
    </div>
  );
}

export default withJsonFormsLayoutProps(VerticalLayoutRenderer);
