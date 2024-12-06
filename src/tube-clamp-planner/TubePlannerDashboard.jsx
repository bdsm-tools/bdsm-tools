import React from 'react';
import { useNavigate } from 'react-router';
import { useLocalStorageState } from 'ahooks';
import { Empty } from 'antd';
import CreatePlan from './viewing/CreatePlan';
import TubePlanCard from './viewing/TubePlanCard';
import ImportPlan from './viewing/ImportPlan';

export default function TubePlannerDashboard() {
  const navigate = useNavigate();
  const [tubePlanIndex, setTubePlanIndex] = useLocalStorageState(
    'tube-plan-index',
    {
      defaultValue: { plans: [] },
    },
  );

  const onNewDesign = (id) => {
    setTubePlanIndex({
      plans: [...new Set([...tubePlanIndex.plans, id])],
    });
    navigate(id);
  };

  const CreateButton = <CreatePlan onCreate={onNewDesign} />;

  const ImportButton = <ImportPlan onImport={onNewDesign} />;

  if (tubePlanIndex.plans.length > 0) {
    return (
      <>
        <div>
          {CreateButton}
          {ImportButton}
        </div>
        <div className='flex' style={{ flexFlow: 'wrap' }}>
          {tubePlanIndex.plans.map((planId) => (
            <TubePlanCard
              key={planId}
              sceneId={planId}
              onDelete={() =>
                setTubePlanIndex((oldIndex) => ({
                  ...oldIndex,
                  plans: oldIndex.plans.filter((id) => id !== planId),
                }))
              }
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <Empty description="There are no plans saved locally in your browser. Create a new one or import one you've downloaded">
      {CreateButton}
      {ImportButton}
    </Empty>
  );
}
