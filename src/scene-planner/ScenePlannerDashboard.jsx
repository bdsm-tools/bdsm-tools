import React from 'react'
import { useLocalStorageState } from 'ahooks'
import ScenePlanCard from './ScenePlanCard'
import { Button } from 'antd'
import { customAlphabet } from 'nanoid'
import { useNavigate } from 'react-router'

const nanoid = customAlphabet('1234567890abcdef', 16);

export default function ScenePlannerDashboard () {
  const navigate = useNavigate();
  const [scenePlanIndex, setScenePlanIndex] = useLocalStorageState('scene-plan-index', {
    defaultValue: { plans: [] },
  });

  const create = () => {
    const generatedId = Buffer.from([
      'local',
      nanoid(),
      'orchestrator',
    ].join(":")).toString('base64');
    setScenePlanIndex({
      plans: [
        ...scenePlanIndex.plans,
        generatedId,
      ],
    });

    navigate(`/tools/scene-planner/${generatedId}`);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        {scenePlanIndex.plans.map(id => (
          <ScenePlanCard key={id} id={id} onDelete={() => setScenePlanIndex((oldIndex) => ({
            ...oldIndex,
            plans: oldIndex.plans.filter((plan) => plan !== id),
          }))} />
        ))}
      </div>
      <Button type='primary' block onClick={create} style={{ marginBottom: 20 }}>
        Create new Plan
      </Button>
    </>
  )
}