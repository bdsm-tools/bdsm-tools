import React from 'react'
import { Button, Checkbox, Input, List, Typography } from 'antd'
import { stringifyNumber } from '../../util'

const options = [
  {
    label: 'Role Play',
    value: 'role-play',
  },{
    label: 'Use Equipment',
    value: 'equipment',
  },{
    label: 'Set Outfits',
    value: 'outfits',
  },
];

export default function SetupSection({ plan, onUpdateLocation, onUpdateSceneLevels, onUpdateSceneLevel, onUpdateEnabledFeatures }) {
  const { sceneLevels, locationDescription } = plan;

  const indeterminate = plan.enabledFeatures.length > 0 && plan.enabledFeatures.length < options.length;
  const checkAll = options.length === plan.enabledFeatures.length;

  return (
    <>
      <Typography style={{ marginTop: 8 }}>
        Enable Features
      </Typography>
      <Checkbox
        indeterminate={indeterminate}
        onChange={({ target }) => onUpdateEnabledFeatures(target.checked ? options.map(({ value }) => value) : [])}
        checked={checkAll}
      >
        (Enable all)
      </Checkbox>
      <Checkbox.Group
        options={options}
        value={plan.enabledFeatures}
        onChange={onUpdateEnabledFeatures}
      />
      <Typography style={{ marginTop: 8 }}>
        Scene Location
      </Typography>
      <Input.TextArea
        placeholder='Describe the location the scene will take place in'
        rows={2}
        defaultValue={locationDescription || ''}
        onChange={({ target }) => onUpdateLocation(target.value)}
      />
      <Typography style={{ marginTop: 8 }}>
        Scene Breakdown
      </Typography>
      <List
        dataSource={sceneLevels.map((name, index) => ({ name, index }))}
        renderItem={(sceneLevel) => (
          <List.Item
            key={sceneLevel.index}
            actions={[
              <Button
                key='delete'
                type='text'
                onClick={() => onUpdateSceneLevels(sceneLevels.filter((name, index) => index !== sceneLevel.index))}
              >
                Remove
              </Button>
            ]}
          >
            <List.Item.Meta
              avatar={sceneLevel.index + 1}
            />
            <Input
              placeholder={`${stringifyNumber(sceneLevel.index + 1, true)} scene name`}
              defaultValue={sceneLevel.name}
              onChange={({ target }) => onUpdateSceneLevel(sceneLevel.index)(target.value)}
            />
          </List.Item>
        )}
      />
      <Button onClick={() => onUpdateSceneLevels([...sceneLevels, ''])}>
        Add Level
      </Button>
    </>
  )
}