import React from 'react';
import { Input, Tabs, Typography } from 'antd'
import { useDebounceFn, useLocalStorageState } from 'ahooks'
import UserSection from './sections/UserSection'
import SetupSection from './sections/SetupSection'
import { keyUpdater } from '../util'
import RoleplaySection from './sections/RoleplaySection'
import EquipmentSection from './sections/EquipmentSection'

export default function LocalScenePlan({ id }) {
  const [plan, setLocalStoragePlan] = useLocalStorageState(`scene-plan-${id}`, {
    defaultValue: {
      title: 'Untitled Plan',
      enabledFeatures: [],
      users: [],
      sceneLevels: [],
      locationDescription: undefined,
      roleplay: {
        general: {},
        userSpecific: {}
      }
    },
  });

  const { run: setPlan } = useDebounceFn(setLocalStoragePlan, { wait: 250 })


  const onUpdateX = keyUpdater(setPlan);
  return (
    <>
      <Typography>
        Title:
      </Typography>
      <Input
        placeholder='Scene title'
        defaultValue={plan.title}
        onChange={({ target }) => onUpdateX('title')(target.value)}
      />
      <Typography style={{ marginTop: 10 }}>
        Description:
      </Typography>
      <Input.TextArea
        placeholder='Scene description'
        rows={2}
        defaultValue={plan.description}
        onChange={({ target }) => onUpdateX('description')(target.value)}
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
                onUpdate={onUpdateX('users')}
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
              <SetupSection
                plan={plan}
                onUpdateLocation={onUpdateX('locationDescription')}
                onUpdateSceneLevel={(index) => onUpdateX(`sceneLevels.${index}`)}
                onUpdateSceneLevels={onUpdateX('sceneLevels')}
                onUpdateEnabledFeatures={onUpdateX('enabledFeatures')}
              />
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
              <RoleplaySection
                plan={plan}
                onUpdateGeneral={onUpdateX('roleplay.general')}
                onUpdateUserSpecific={(ref) => onUpdateX(`roleplay.userSpecific.${ref}`)}
              />
            </>
          ),
        },{
          label: `Equipment`,
          key: 'equipment',
          children: (
            <>
              <Typography.Title level={5} style={{ marginTop: 8 }}>
                Equipment
              </Typography.Title>
              <EquipmentSection plan={plan} />
            </>
          ),
        }].filter(({ key }) => [...plan.enabledFeatures, 'setup', 'users'].includes(key))}
      />
    </>
  )
}