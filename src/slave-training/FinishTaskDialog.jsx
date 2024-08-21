import React from 'react';
import { Modal, Result, Statistic } from 'antd';
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';

export default function FinishTaskDialog({ open, finish = {}, stats, previousStats, onClose }) {

  const points = Math.abs(stats?.stats?.points - previousStats?.stats?.points);

  if (!finish) return null;

  if (!finish.success) {
    return (
      <Modal
        title="Task Failed"
        open={open}
        closable
        onCancel={onClose}
        cancelButtonProps={{ style: { display: 'none' } }}
        onOk={onClose}
        okText='Close'
      >
        <Result
          status="error"
          title="Very disappointing Slave, you have failed the task"
          subTitle="You have lost points"
          extra={[
            <Statistic value={points} prefix={<MinusOutlined />}/>
          ]}
        />
      </Modal>
    )
  }

  return (
    <Modal
      title="Task Complete"
      open={open}
      closable
      onCancel={onClose}
      cancelButtonProps={{ style: { display: 'none' } }}
      onOk={onClose}
      okText='Close'
    >
      <Result
        status="success"
        title="Well done Slave, you have successfully completed the task!"
        subTitle="You've gained some points"
        extra={[
          <Statistic value={points} prefix={<PlusOutlined />}/>
        ]}
      />
    </Modal>
  )
}