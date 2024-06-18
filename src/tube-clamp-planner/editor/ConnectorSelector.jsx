import React from 'react';
import { Button } from 'antd';
import { getTypeDefinitionsAsOptions } from '../connectors/types';
import ConnectorPreview from './ConnectorPreview';

export default function ConnectorSelector({ slot, value, onChange }) {
  const options = getTypeDefinitionsAsOptions((def) => {
    if (slot === 'end') return def.endConnections > 0;
    if (slot === 'middle') return def.middleConnections > 0;
    if (slot === 'surface') return !!def.hasSurfaceConnection;
    return true;
  });

  return (
    <div className='flex' style={{ margin: 10 }}>
      {options.map(({ label, value: type }) => (
        <div
          key={type}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft: 10,
            marginRight: 10,
            padding: 10,
            border: value === type ? 'dashed red' : undefined,
            borderRadius: 15,
          }}
          onClick={() => onChange(type)}
        >
          <ConnectorPreview connectorType={type} />
          <Button
            type="primary"
            ghost
            style={{ marginTop: 5 }}
            onClick={() => onChange(type)}
          >
            {label}
          </Button>
        </div>
      ))}
    </div>
  );
}
