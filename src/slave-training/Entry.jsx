import React from 'react';
import { PageHeader, Col, Row, Divider } from 'antd';
import useAnalytics from '../hooks/useAnalytics'
import DailyTask from './DailyTask';
import TaskStats from './TaskStats';
import EditParameters from './EditParameters';
import RandomTask from './RandomTask';
import BodyPartTask from './BodyPartTask';
import api from '../services/slave-training-api';
import TaskCountWarning from './TaskCountWarning';

export default function Entry() {
  useAnalytics('Slave Training');

  const [stats, setStats] = React.useState({});

  React.useEffect(() => {
    api.getStats()
      .then(setStats);
  }, []);

  const completeTask = (taskId) => {
    api.completeTask(taskId)
      .then(setStats);
  };

  const failTask = (taskId) => {
    api.failTask(taskId)
      .then(setStats);
  };

  return (
    <React.Fragment>
      <PageHeader
        title={'Slave Training'}
        // onBack={params.type ? () => navigate('.') : undefined}
      />
        <div>
          <Row>
            <Col span={24}>
              <div className='flex space-between' style={{ marginRight: 20 }}>
                <TaskStats stats={stats} />
              </div>
              <Divider />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <EditParameters />
            </Col>
            <Col span={16}>
              <TaskCountWarning/>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} xl={12} xxl={8}>
              <DailyTask onCompleteTask={completeTask} onFailTask={failTask} />
            </Col>
            <Col xs={24} xl={12} xxl={8}>
              <RandomTask onCompleteTask={completeTask} onFailTask={failTask} />
            </Col>
            <Col xs={24} xl={12} xxl={8}>
              <BodyPartTask onCompleteTask={completeTask} onFailTask={failTask} />
            </Col>
          </Row>
      </div>
    </React.Fragment>
  )
}