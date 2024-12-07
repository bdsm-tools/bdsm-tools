import React from 'react';
import { Tag, Affix } from 'antd';
import { PageHeader } from '@ant-design/pro-components';
import { DeploymentUnitOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const back = () => navigate('/');
  return (
    <Affix offsetTop={0}>
      <PageHeader
        title='BDSM Tools'
        onBack={pathname !== '/' ? back : undefined}
        tags={<Tag color='red'>{process.env.VERSION}</Tag>}
        avatar={{ icon: <DeploymentUnitOutlined /> }}
      />
    </Affix>
  );
}
