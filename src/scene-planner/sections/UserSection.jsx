import React from 'react'
import { Button, Input, List, Select } from 'antd'
import { v4 as uuid} from 'uuid';
import UserOutlined from '@ant-design/icons/lib/icons/UserOutlined'
import { byRole, dList, sList } from '../util'

export default function UserSection({ users, onUpdate }) {
  const [user, setUser] = React.useState({ ref: uuid(), name: undefined, role: '(No role)' });
  const existingUser = ({ name = '' }) => users.filter(({ name: name2 = '' }) => name.toUpperCase() === name2.toUpperCase()).length > 0;

  return (
    <>
      <List
        dataSource={users.sort(byRole)}
        renderItem={(listUser) => (
          <List.Item
            key={user.name}
            actions={[
              <Button
                key='delete'
                type='text'
                onClick={() => onUpdate(users.filter(({ name }) => name !== listUser.name))}
              >
                Remove
              </Button>
            ]}
          >
            <List.Item.Meta
              avatar={<UserOutlined />}
              title={listUser.name}
              description={[{
                label: 'Role',
                value: listUser.role,
              }, {
                label: 'Outfit',
                value: listUser.outfit,
              }].filter(({ value }) => !!value).map(({ label, value }) => `${label}: ${value}`).join(', ')}
            />
          </List.Item>
        )}
      />
      <Input.Group compact>
        <Input
          style={{ width: '50%' }}
          placeholder="Participant's Name"
          value={user.name}
          onChange={({ target }) => setUser((oldUser) => ({
            ...oldUser,
            name: target.value,
          }))}
          status={existingUser(user) ? "error" : undefined}
        />
        {user.customRole ? (
          <Input
            style={{ width: '25%' }}
            value={user.role}
            onChange={({ target }) => setUser((oldUser) => ({
              ...oldUser,
              role: target.value,
            }))}
            autoFocus
          />
        ) : (
          <Select
            style={{ width: '25%' }}
            value={user.role}
            onChange={(value) => setUser((oldUser) => ({
              ...oldUser,
              role: value,
              customRole: value === 'Other',
            }))}
          >
            <Select.Option value='(No role)'>(No role)</Select.Option>
            {[...dList, ...sList].map((role) => (
              <Select.Option key={role} value={role}>{role}</Select.Option>
            ))}
            <Select.Option value='Other'>Other...</Select.Option>
          </Select>
        )}
        <Button
          style={{ width: '25%' }}
          type="primary"
          disabled={!user.name || existingUser(user)}
          onClick={() => {
            onUpdate([
              ...users,
              user,
            ]);
            setUser({ ref: uuid(), role: '(No role)' });
          }}
        >
          Add
        </Button>
      </Input.Group>
    </>
  )
}