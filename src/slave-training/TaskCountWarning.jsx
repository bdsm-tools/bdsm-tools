import React from 'react';
import { Alert } from 'antd';
import useGlobalHeader from '../state/useGlobalHeader';

export default function TaskCountWarning() {
  const globalHeader = useGlobalHeader();
  const taskCount = globalHeader['x-bdsmtools-slave-task-count'];

  if (taskCount !== undefined) {
    return (
      <Alert
        message={`
                Your current configuration of body parts and equipment only provide ${taskCount} tasks
                to be generated. Consider adding more to provide more diversity of tasks.
                `}
        type='warning'
        showIcon
      />
    );
  }
  return null;
}