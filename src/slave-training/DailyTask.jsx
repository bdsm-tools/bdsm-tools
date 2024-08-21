import React from 'react';
import {Spin} from 'antd';
import moment from 'moment';
import Task from './Task';
import api from '../services/slave-training-api';
import { hash } from '../util';

export default function DailyTask({ completedTasks = [], failedTasks = [], onCompleteTask, onFailTask }) {
  const [task, setTask] = React.useState(undefined);

  React.useEffect(() => {
    api.getDailyTask().then(setTask);
  }, []);

  if (task) {
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
  return <Spin />;
}