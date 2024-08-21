import React from 'react';
import { Statistic } from 'antd';

export default function TaskStats({ stats }) {

  return (

    <>
      <Statistic title="Daily Streak" value={stats.dailyStreak} />
      <Statistic title="Reward points" value={stats.points} />
      <Statistic title="Total completed tasks" value={stats.completedTasks} />
      <Statistic title="Total failed tasks" value={stats.failedTasks} />
      </>
  );
}