import React from 'react';
import { PageHeader, Col, Row, Divider, notification, Alert } from 'antd';
import useAnalytics from '../hooks/useAnalytics'
import DailyTask from './task/DailyTask';
import TaskStats from './stats/TaskStats';
import EditParameters from './config/EditParameters';
import RandomTask from './task/RandomTask';
import BodyPartTask from './task/BodyPartTask';
import api from '../services/slave-training-api';
import TaskCountWarning from './stats/TaskCountWarning';
import FinishTaskDialog from './task/FinishTaskDialog';
import { usePrevious } from 'ahooks';
import ReactGA from 'react-ga4';

export default function Entry() {
  useAnalytics('Slave Training');

  const [stats, setStats] = React.useState({
    stats: {
      points: 0,
      completedTasks: 0,
      failedTasks: 0,
      dailyStreak: 0,
    },
    completedTasks: [],
    failedTasks: [],
  });
  const previousStats = usePrevious(stats);
  const [finish, setFinish] = React.useState(undefined);

  React.useEffect(() => {
    api.getStats()
      .then(setStats)
      .catch(() => notification.error({
        message: 'Error fetching task statistics',
        description: 'Our server may be experiencing issues. Please try again later',
      }));
  }, []);

  const completeTask = (daily = false) => (taskId, bonus) => {
    ReactGA.event('task_complete', { daily, taskId, bonus });

    api.completeTask(taskId, bonus, daily)
      .then(setStats)
      .then(() => setFinish({ success: true }))
      .catch(() => notification.error({
        message: 'Error when completing task',
        description: 'Our server may be experiencing issues. Please try again later',
      }));
  };

  const failTask = (daily = false) => (taskId, bonus) => {
    ReactGA.event('task_fail', { daily, taskId, bonus });

    api.failTask(taskId, bonus, daily)
      .then(setStats)
      .then(() => setFinish({ success: false }))
      .catch(() => notification.error({
        message: 'Error when failing the task',
        description: 'Our server may be experiencing issues. Please try again later',
      }));
  };

  return (
    <React.Fragment>
      <PageHeader
        title={'Slave Training'}
        subTitle={<Alert
          message={`Currently limited tasks - more a being written all the time`}
          type='warning'
        />}
        // onBack={params.type ? () => navigate('.') : undefined}
      />
        <div>
          <Row>
            <Col span={24}>
              <div className='flex space-between' style={{ marginRight: 20 }}>
                <TaskStats stats={stats.stats} />
              </div>
              <Divider />
            </Col>
          </Row>
          <Row>
            <Col xs={24} xl={12} xxl={8}>
              <EditParameters />
            </Col>
            <Col xs={24} xl={12} xxl={16}>
              <TaskCountWarning/>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} xl={12} xxl={8}>
              <DailyTask
                completedTasks={stats.completedTasks}
                failedTasks={stats.failedTasks}
                onCompleteTask={completeTask(true)}
                onFailTask={failTask(true)}
              />
            </Col>
            <Col xs={24} xl={12} xxl={8}>
              <RandomTask
                completedTasks={stats.completedTasks}
                failedTasks={stats.failedTasks}
                onCompleteTask={completeTask(false)}
                onFailTask={failTask(false)}
              />
            </Col>
            <Col xs={24} xl={12} xxl={8}>
              <BodyPartTask
                completedTasks={stats.completedTasks}
                failedTasks={stats.failedTasks}
                onCompleteTask={completeTask(false)}
                onFailTask={failTask(false)}
              />
            </Col>
          </Row>
      </div>
      <FinishTaskDialog
        open={!!finish}
        finish={finish}
        stats={stats}
        previousStats={previousStats}
        onClose={() => setFinish(undefined)}
      />
    </React.Fragment>
  )
}