import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Affix } from 'antd';
import {
  FileDoneOutlined,
  QuestionCircleOutlined,
  ToolOutlined,
  InfoCircleOutlined,
  HomeOutlined,
  BulbOutlined,
  ProfileOutlined,
  TeamOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { isMobile } from 'react-device-detect';

export default function NavMenu({ vertical = false }) {
  const { pathname } = useLocation();

  return (
    <Affix offsetTop={0}>
      <Menu
        mode={vertical ? 'inline' : 'horizontal'}
        selectedKeys={pathname === '/' ? '/' : pathname.split('/')}
        defaultOpenKeys={isMobile ? [] : ['tools', ...pathname.split('/')]}
        style={{ minWidth: 0, flex: 'auto' }}
        items={[
          {
            key: '/',
            title: 'Home',
            label: <Link to='/'>Home</Link>,
            icon: <HomeOutlined />,
          },
          {
            key: 'tools',
            title: 'Tools',
            label: 'Tools',
            icon: <ToolOutlined />,
            children: [
              {
                key: 'scene-negotiation',
                title: 'Scene Negotiation',
                label: (
                  <Link to='/tools/scene-negotiation'>Scene Negotiation</Link>
                ),
                icon: <FileDoneOutlined />,
              },
              {
                key: 'bdsm-scenarios',
                title: 'Scenario Picker',
                label: <Link to='/tools/bdsm-scenarios'>Scenario Picker</Link>,
                icon: <ProfileOutlined />,
              },
              {
                key: 'slave-training',
                title: 'Slave Training',
                label: <Link to='/tools/slave-training'>Slave Training</Link>,
                icon: <TeamOutlined />,
              },
              {
                key: 'tube-planner',
                title: 'Tube Clamp Planner',
                label: <Link to='/tools/tube-planner'>Tube Clamp Planner</Link>,
                icon: <EditOutlined />,
              },
            ],
          },
          {
            key: 'about',
            title: 'About',
            label: 'About',
            icon: <BulbOutlined />,
            children: [
              {
                key: 'info',
                title: 'Information',
                label: <Link to='/about/info'>Information</Link>,
                icon: <InfoCircleOutlined />,
              },
              {
                key: 'faq',
                title: 'FAQ',
                label: <Link to='/about/faq'>FAQ</Link>,
                icon: <QuestionCircleOutlined />,
              },
            ],
          },
        ]}
      />
    </Affix>
  );
}
