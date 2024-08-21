import React from 'react';
import { Button, Tooltip } from 'antd';
import moment from 'moment';
import Task from './Task';
import api from '../services/slave-training-api';
import { hash } from '../util';
import { useLocalStorageState } from 'ahooks';
import { ReloadOutlined } from '@ant-design/icons';

export default function RandomTask({ onCompleteTask, onFailTask }) {
  const [task, setTask] = useLocalStorageState('slave-task-random-task', {
    serializer: JSON.stringify,
    deserializer: JSON.parse,
  });

  const getTask = () => {
    setTask({ loading: true });
    api.getTask().then((task) => setTask({
      ...task,
      generatedOn: moment().format('HH:mm:ss [on] MMMM Do, YYYY'),
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
        subTitle={`Generated on ${task.generatedOn}`}
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