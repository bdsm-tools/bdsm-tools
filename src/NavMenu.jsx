import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Menu, Affix} from "antd";
import {FileDoneOutlined, QuestionCircleOutlined} from '@ant-design/icons';

export default function NavMenu({location, vertical}) {
  const {pathname} = location;
  return (
    <Affix offsetTop={0}>
      <Menu
        mode={vertical ? 'inline' : 'horizontal'}
        selectedKeys={pathname.split('/')}
        defaultOpenKeys={['tools']}
        style={{ paddingBottom: 'auto' }}
      >
        <Menu.SubMenu key="tools" title="Tools">
          <Menu.Item key="scene-negotiation" icon={<FileDoneOutlined/>}>
            <Link to="/tools/scene-negotiation">
              Scene Negotiation
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="about" icon={<QuestionCircleOutlined />}>
          <Link to="/about">
            About
          </Link>
        </Menu.Item>
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
