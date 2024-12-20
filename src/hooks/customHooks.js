import React from 'react';
import { useKeyPress } from 'ahooks';

export default function useKeyDown(keyFilter, option) {
  const [keyEvent, setKeyEvent] = React.useState();
  useKeyPress(
    keyFilter,
    (e) => {
      if (e.target instanceof HTMLBodyElement) {
        setKeyEvent(e);
      }
    },
    {
      ...option,
      events: ['keydown'],
    },
  );
  useKeyPress(keyFilter, () => setKeyEvent(null), {
    ...option,
    events: ['keyup'],
  });

  return keyEvent;
}
