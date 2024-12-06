import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Affix, Button } from 'antd';
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
import MenuUnfoldOutlined from '@ant-design/icons/lib/icons/MenuUnfoldOutlined';
import MenuFoldOutlined from '@ant-design/icons/lib/icons/MenuFoldOutlined';

export default function NavMenu({ vertical }) {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Affix offsetTop={0}>
      <Menu
        mode={vertical ? 'inline' : 'horizontal'}
        selectedKeys={pathname === '/' ? '/' : pathname.split('/')}
        defaultOpenKeys={['tools', ...pathname.split('/')]}
        style={{ paddingBottom: 'auto', minWidth: 10 }}
        inlineCollapsed={collapsed}
        // items={[]}
      >
        <Menu.Item key='/' icon={<HomeOutlined />}>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.SubMenu key='tools' title='Tools' icon={<ToolOutlined />}>
          <Menu.Item key='scene-negotiation' icon={<FileDoneOutlined />}>
            <Link to='/tools/scene-negotiation'>Scene Negotiation</Link>
          </Menu.Item>
          <Menu.Item key='bdsm-scenarios' icon={<ProfileOutlined />}>
            <Link to='/tools/bdsm-scenarios'>Scenario Picker</Link>
          </Menu.Item>
          <Menu.Item key='slave-training' icon={<TeamOutlined />}>
            <Link to='/tools/slave-training'>Slave Training</Link>
          </Menu.Item>
          <Menu.Item key='tube-planner' icon={<EditOutlined />}>
            <Link to='/tools/tube-planner'>Tube Clamp Planner</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key='about' title='About' icon={<BulbOutlined />}>
          <Menu.Item key='info' icon={<InfoCircleOutlined />}>
            <Link to='/about/info'>Information</Link>
          </Menu.Item>
          <Menu.Item key='faq' icon={<QuestionCircleOutlined />}>
            <Link to='/about/faq'>FAQ</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
      <Button
        style={{ position: 'absolute', width: '100%', bottom: 0 }}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed((old) => !old)}
      >
        {collapsed ? '' : 'Collapse'}
      </Button>
    </Affix>
  );
}

NavMenu.defaultProps = {
  vertical: false,
};

NavMenu.propTypes = {
  vertical: PropTypes.bool,
};
