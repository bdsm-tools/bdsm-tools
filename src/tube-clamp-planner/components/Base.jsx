import React from 'react';
import Floor from '../nodes/Floor';
import Wall from '../nodes/Wall';

export default function Base({ width, length, height }) {
  return (
    <>
      <Floor width={width} length={length} />
      <Wall width={width} length={length} height={height} />
    </>
  );
}
