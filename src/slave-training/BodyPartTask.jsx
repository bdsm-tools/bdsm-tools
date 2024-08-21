import React from 'react';
import { Input, Select, Button, Tooltip } from 'antd';
import moment from 'moment';
import Task from './Task';
import api from '../services/slave-training-api';
import { hash } from '../util';
import { bodyParts } from '../components/MyBodyParts';
import { useLocalStorageState } from 'ahooks';
import { CloseOutlined } from '@ant-design/icons';

export default function BodyPartTask({ onCompleteTask, onFailTask }) {
  const [tasks, setTasks] = useLocalStorageState('slave-task-random-body-part-task', {
    defaultValue: {},
    serializer: JSON.stringify,
    deserializer: JSON.parse,
  });
  const [bodyPartState, setBodyPart] = React.useState(undefined);

  const getTask = (bodyPart) => {
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
      })));
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
          subTitle={`Generated on ${task.generatedOn}`}
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
          randomNumber={parseInt(hash(moment().format('YYYY-MM-DD')))}
          onCompleteTask={onCompleteTask}
          onFailTask={onFailTask}
        />
      ))}
    </>
  );
}