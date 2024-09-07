import React from 'react';
import { Button, notification, Tooltip } from 'antd';
import moment from 'moment';
import Task from './Task';
import api from '../../services/slave-training-api';
import { hash } from '../../util';
import { useLocalStorageState } from 'ahooks';
import { ReloadOutlined } from '@ant-design/icons';

export default function RandomTask({ completedTasks = [], failedTasks = [], onCompleteTask, onFailTask }) {
  const [task, setTask] = useLocalStorageState('slave-task-random-task', {
    serializer: JSON.stringify,
    deserializer: JSON.parse,
  });

  const getTask = () => {
    setTask({ loading: true });
    api.getTask()
      .then((task) => setTask({
      ...task,
      generatedOn: moment().format('HH:mm:ss [on] MMMM Do, YYYY'),
    }))
      .catch(() => notification.error({
        message: 'Error fetching random task',
        description: 'Our server may be experiencing issues. Please try again later',
      }));
  };

  React.useEffect(() => {
    if (task?.loading) {
      getTask();
    }
  }, []);

  if (task) {
    return (
      <Task
        title='Random Task'
        subTitle={<Tooltip title={task.generatedOn}>Generated on {task.generatedOn}</Tooltip>}
        action={(
          <Tooltip title='Get a new random task'>
            <Button
              shape="circle"
              icon={<ReloadOutlined />}
              onClick={getTask}
            />
          </Tooltip>
        )}
        task={task}
        randomNumber={parseInt(hash(moment().format('YYYY-MM-DD')))}
        onCompleteTask={onCompleteTask}
        onFailTask={onFailTask}
        isCompleted={!!completedTasks.find(({ taskId }) => taskId === task._id)}
        isFailed={!!failedTasks.find(({ taskId }) => taskId === task._id)}
      />
    );
  }
  return (
    <Button
      onClick={getTask}
    >
      Get Random Task
    </Button>
  );
}