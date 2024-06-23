import React from 'react';
import { alphabeticalSort, ellipse } from '../util';
import { Tag, Popover } from 'antd';

export default function Tags({ values, colourFunction = {} }) {
  return (
    <>
      {Object.values(values)
        .sort(alphabeticalSort())
        .map((value) => (
          <Popover key={value} content={value} trigger='click'>
            <Tag color={colourFunction[value] || value}>
              {ellipse(value, { limit: 20 })}
            </Tag>
          </Popover>
        ))}
    </>
  );
}
