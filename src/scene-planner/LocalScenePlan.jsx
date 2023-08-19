import React from 'react';
import { Input, Tabs, Typography } from 'antd'
import { useDebounceFn, useLocalStorageState } from 'ahooks'
import UserSection from './sections/UserSection'

export default function LocalScenePlan({ id }) {
  const [plan, setLocalStoragePlan] = useLocalStorageState(`scene-plan-${id}`, {
    defaultValue: {
      title: 'Untitled Plan',
      enabledFeatures: [],
      users: [],
    },
  });

  const { run: setPlan } = useDebounceFn(setLocalStoragePlan, { wait: 250 })

  return (
    <>
      <Typography>
        Title:
      </Typography>
      <Input
        placeholder='Scene title'
        defaultValue={plan.title}
        onChange={({ target }) => setPlan(oldPlan => ({
          ...oldPlan,
          title: target.value,
        }))}
      />
      <Typography style={{ marginTop: 10 }}>
        Description:
      </Typography>
      <Input.TextArea
        placeholder='Scene description'
        rows={2}
        defaultValue={plan.description}
        onChange={({ target }) => setPlan(oldPlan => ({
          ...oldPlan,
          description: target.value,
        }))}
      />

      <Tabs
        style={{ marginTop: 20 }}
        tabPosition='left'
        items={[{
          label: `Participants`,
          key: 'users',
          children: (
            <>
              <Typography.Title level={5} style={{ marginTop: 8 }}>
                Participants
              </Typography.Title>
              <UserSection
                users={plan.users}
                onUpdate={(users) => setPlan((oldPlan) => ({
                  ...oldPlan,
                  users,
                }))}
              />
            </>
          ),
        },{
          label: `Setup`,
          key: 'setup',
          children: (
            <>
              <Typography.Title level={5} style={{ marginTop: 8 }}>
                Setup
              </Typography.Title>
            </>
          ),
        },{
          label: `Role Play`,
          key: 'role-play',
          children: (
            <>
              <Typography.Title level={5} style={{ marginTop: 8 }}>
                Role Play
              </Typography.Title>
            </>
          ),
        }].filter(({ key }) => [plan.enabledFeatures, 'setup', 'users'].includes(key))}
      />
    </>
  )
}