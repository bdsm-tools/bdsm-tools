import React from 'react';
import { PageHeader, Col, Row, Divider, Modal, Result } from 'antd';
import useAnalytics from '../hooks/useAnalytics'
import DailyTask from './DailyTask';
import TaskStats from './TaskStats';
import EditParameters from './EditParameters';
import RandomTask from './RandomTask';
import BodyPartTask from './BodyPartTask';
import api from '../services/slave-training-api';
import TaskCountWarning from './TaskCountWarning';
import FinishTaskDialog from './FinishTaskDialog';
import { usePrevious } from 'ahooks';

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
      .then(setStats);
  }, []);

  const completeTask = (daily = false) => (taskId, bonus) => {
    api.completeTask(taskId, bonus, daily)
      .then(setStats)
      .then(() => setFinish({ success: true }));
  };

  const failTask = (daily = false) => (taskId, bonus) => {
    api.failTask(taskId, bonus, daily)
      .then(setStats)
      .then(() => setFinish({ success: false }));
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
                <TaskStats stats={stats.stats} />
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