import React from 'react';
import { App } from 'antd';
import moment from 'moment';
import ReactGA from 'react-ga4';
import Task from './Task';
import api from '../../services/slave-training-api';
import { hash } from '../../util';

export default function DailyTask({
  completedTasks = [],
  failedTasks = [],
  onCompleteTask,
  onFailTask,
}) {
  const [task, setTask] = React.useState({ loading: true });

  const { notification } = App.useApp();

  React.useEffect(() => {
    ReactGA.event('task_generation_daily', {});

    setTask({ loading: true });
    api
      .getDailyTask()
      .then(setTask)
      .catch(() =>
        notification.error({
          message: 'Error fetching daily task',
          description:
            'Our server may be experiencing issues. Please try again later',
        }),
      );
  }, []);

  return (
    <Task
      title={`Daily Task for ${moment().format('MMMM Do, YYYY')}`}
      task={task}
      randomNumber={parseInt(hash(moment().format('YYYY-MM-DD')))}
      onCompleteTask={onCompleteTask}
      onFailTask={onFailTask}
      isCompleted={!!completedTasks.find(({ taskId }) => taskId === task._id)}
      isFailed={!!failedTasks.find(({ taskId }) => taskId === task._id)}
    />
  );
}
