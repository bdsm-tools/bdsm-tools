import React from 'react';
import { Avatar, Typography } from 'antd';

export default function ChatMessage({ message }) {

  return (
    <div className='flex'>
      {message.who === 'user' && (
        <Avatar shape="square" size="large"/>
      )}
      <Typography>
        {message.value}
      </Typography>
      {message.who === 'domme' && (
        <Avatar shape="square" size="large"/>
      )}
    </div>
  )
}