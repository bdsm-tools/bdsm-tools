import React from 'react';
import { Input, Select, Button, Tooltip, notification } from 'antd';
import moment from 'moment';
import Task from './Task';
import api from '../../services/slave-training-api';
import { hash } from '../../util';
import { bodyParts } from '../../components/MyBodyParts';
import { useLocalStorageState } from 'ahooks';
import { CloseOutlined } from '@ant-design/icons';
import ReactGA from 'react-ga4';

export default function BodyPartTask({ completedTasks = [], failedTasks = [], onCompleteTask, onFailTask }) {
  const [tasks, setTasks] = useLocalStorageState('slave-task-random-body-part-task', {
    defaultValue: {},
    serializer: JSON.stringify,
    deserializer: JSON.parse,
  });
  const [bodyPartState, setBodyPart] = React.useState(undefined);

  const getTask = (bodyPart) => {
    ReactGA.event('task_generation_body_part', { bodyPart });

    setTasks((oldTasks) => ({
      ...oldTasks,
      [bodyPart]: {
        generatedForBodyPart: bodyPart,
        loading: true,
      }
    }));
    api.getTask(bodyPart)
      .then((task) => setTasks((oldTasks) => ({
        ...oldTasks,
        [bodyPart]: {
          ...task,
          generatedForBodyPart: bodyPart,
          generatedOn: moment().format('HH:mm:ss [on] MMMM Do, YYYY'),
        }
      })))
      .catch(() => notification.error({
        message: `Error fetching task for ${bodyPart}`,
        description: 'Our server may be experiencing issues. Please try again later',
      }));
  };

  React.useEffect(() => {
    Object.values(tasks)
      .filter(({ loading }) => !!loading)
      .forEach(({ generatedForBodyPart }) => getTask(generatedForBodyPart));
  }, []);

  return (
    <>
      <Input.Group compact style={{ marginBottom: 20 }}>
        <Select
          options={bodyParts}
          style={{ width: 180 }}
          placeholder="Select a body part"
          onChange={(value) => setBodyPart(value)}
        />
        <Button onClick={() => getTask(bodyPartState)}>
          Get Random Task
        </Button>
      </Input.Group>
      {Object.values(tasks).filter(Boolean).map((task) => (
        <Task
          key={task._id}
          title={`Random Task for the ${task.generatedForBodyPart}`}
          subTitle={<Tooltip title={task.generatedOn}>Generated on {task.generatedOn}</Tooltip>}
          action={(
            <Tooltip title='Remove task'>
              <Button
                shape="circle"
                icon={<CloseOutlined />}
                onClick={() => setTasks((oldTasks) => ({
                  ...oldTasks,
                  [task.generatedForBodyPart]: undefined,
                }))}
              />
            </Tooltip>
          )}
          task={task}
          randomNumber={parseInt(hash(task.generatedOn))}
          onCompleteTask={onCompleteTask}
          onFailTask={onFailTask}
          isCompleted={!!completedTasks.find(({ taskId }) => taskId === task._id)}
          isFailed={!!failedTasks.find(({ taskId }) => taskId === task._id)}
        />
      ))}
    </>
  );
}