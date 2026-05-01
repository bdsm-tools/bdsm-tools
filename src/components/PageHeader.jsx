import React from 'react';
import { Button, Typography, Space, Avatar } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

const PageHeader = ({ title, onBack, tags, avatar, style }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      height: 64,
      margin: 'auto',
      ...style,
    }}>
      {onBack && (
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '32px', // Matches default Avatar/Small input height
            padding: '4px'
          }}
        />
      )}

      {avatar && (
        <Avatar
          size={32}
          icon={avatar.icon}
          src={avatar.src}
          shape="square"
          style={{ flexShrink: 0 }}
        />
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        lineHeight: 1
      }}>
        <Title level={4} style={{ margin: 0, whiteSpace: 'nowrap' }}>
          {title}
        </Title>

        {tags && (
          <Space size={[4, 0]} wrap>
            {tags}
          </Space>
        )}
      </div>
    </div>
  );
};

export default PageHeader;