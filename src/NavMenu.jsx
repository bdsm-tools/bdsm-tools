import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Menu, Affix} from "antd";
import {FileDoneOutlined, QuestionCircleOutlined, ToolOutlined, InfoCircleOutlined} from '@ant-design/icons';

export default function NavMenu({location, vertical}) {
  const {pathname} = location;
  return (
    <Affix offsetTop={0}>
      <Menu
        mode={vertical ? 'inline' : 'horizontal'}
        selectedKeys={pathname.split('/')}
        defaultOpenKeys={['tools', ...pathname.split('/')]}
        style={{ paddingBottom: 'auto' }}
      >
        <Menu.SubMenu key="tools" title="Tools" icon={<ToolOutlined />}>
          <Menu.Item key="scene-negotiation" icon={<FileDoneOutlined/>}>
            <Link to="/tools/scene-negotiation">
              Scene Negotiation
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="about" title="About">
          <Menu.Item key="info" icon={<InfoCircleOutlined />}>
            <Link to="/about/info">
              Information
            </Link>
          </Menu.Item>
          <Menu.Item key="faq" icon={<QuestionCircleOutlined />}>
            <Link to="/about/faq">
              FAQ
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Affix>
  );
}

NavMenu.defaultProps = {
  vertical: false,
};

NavMenu.propTypes = {
  vertical: PropTypes.bool,
};
