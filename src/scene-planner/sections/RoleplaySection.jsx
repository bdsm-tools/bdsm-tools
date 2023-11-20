import React from 'react';
import { Checkbox, Divider, Input, Popover, Tag, Tooltip, Typography } from 'antd'
import InfoIcon from '@ant-design/icons/InfoCircleOutlined'

export default function RoleplaySection({ plan, onUpdateGeneral, onUpdateUserSpecific }) {

  const { roleplay, users } = plan;

  return (
    <div style={{ marginBottom: 50 }}>
      <Typography style={{ marginTop: 8 }}>
        General Overview
        <Popover
          title="Guidance"
          content={(
            <Typography.Paragraph>
              Provide an overall description of the scene from an outside viewer. Set the scene, paint a picture of
              the environment. Avoid intricate details of particular characters, that comes later.
              <ul>
                <li>Include what the atmosphere is like</li>
                <li>Include how the characters know each other</li>
                <li>Include any important character dynamics</li>
              </ul>
              E.g. The bar is quiet for the time, music is playing but not loudly. Two old friends meet after
              not seeing each other for several years.
            </Typography.Paragraph>
          )}
        >
          <InfoIcon style={{ marginLeft: 5 }} />
        </Popover>
      </Typography>
      <div style={{ marginLeft: 20 }}>
        <Input.TextArea
          placeholder='Describe the background of the scene'
          rows={2}
          defaultValue={roleplay?.general?.overview || ''}
          onChange={({ target }) => onUpdateGeneral({ overview: target.value })}
        />
      </div>
      {users.map((user) => {
        const userCharacter = roleplay?.userSpecific[user.ref] || {};
        const onUpdateUser = onUpdateUserSpecific(user.ref);
        const name = userCharacter.character?.enabled ? userCharacter.character?.name : user.name;
        return (
          <div key={user.ref}>
            <Divider />
            <Typography style={{ marginTop: 8 }}>
              {user.name} <Tag>{user.role}</Tag>
            </Typography>
            <div style={{ marginLeft: 20 }}>
              <Checkbox
                onChange={({ target }) => onUpdateUser({ character: { enabled: !target.checked } })}
                checked={!userCharacter.character?.enabled}
                defaultChecked
              >
                The participant is playing themselves
              </Checkbox>
              {!!userCharacter.character?.enabled && (
                <>
                  <Typography style={{ marginTop: 8 }}>
                    Character's name
                  </Typography>
                  <Input
                    defaultValue={userCharacter.character?.name}
                    onChange={({ target }) => onUpdateUser({ character: { name: target.value } })}
                  />
                  <Typography style={{ marginTop: 8 }}>
                    Character's age
                  </Typography>
                  <Input
                    defaultValue={userCharacter.character?.age}
                    onChange={({ target }) => onUpdateUser({ character: { age: target.value } })}
                  />
                </>
              )}
              <Typography style={{ marginTop: 8 }}>
                Why is {name} here?
                <Popover
                  title="Guidance"
                  content={(
                    <Typography.Paragraph style={{ minWidth: '200px', maxWidth: '40vw' }}>
                      Give details of why this character is here. This paragraph should setup this characters motivations
                      for later, giving the participant an idea on how they should act. Write as though you are talking
                      to the participant/character. Not everything has to be important to the scene but it should help give
                      the participant something to get into the role. Think about:
                      <ul>
                        <li>How did this character get here?</li>
                        <li>What do they hope to achieve?</li>
                        <li>Be sure to include a basis for why a character my act a certain why in the scene</li>
                      </ul>
                      E.g. You have traveled via bus to a bar you've never been before to meet an old friend. You had
                      a bit of a crush on this friend years ago but nothing ever came of it.
                    </Typography.Paragraph>
                  )}
                >
                  <InfoIcon style={{ marginLeft: 5 }} />
                </Popover>
              </Typography>
              <Input.TextArea
                placeholder='Tell the participant why their character is there'
                rows={2}
                defaultValue={userCharacter.why || ''}
                onChange={({ target }) => onUpdateUser({ why: target.value })}
              />
            </div>
          </div>
        )
      })}
      <Divider />
      <Typography style={{ marginTop: 8 }}>
        What happens?
        <Popover
          title="Guidance"
          content={(
            <Typography.Paragraph>
              Provide an explanation of what happens to cause the scene to start.
              <ul>
                <li></li>
              </ul>
            </Typography.Paragraph>
          )}
        >
          <InfoIcon style={{ marginLeft: 5 }} />
        </Popover>
      </Typography>
      <div style={{ marginLeft: 20 }}>
        <Input.TextArea
          placeholder='Describe what happens to cause the scene to start'
          rows={2}
          defaultValue={roleplay?.general?.what || ''}
          onChange={({ target }) => onUpdateGeneral({ what: target.value })}
        />
      </div>
    </div>
  );
}