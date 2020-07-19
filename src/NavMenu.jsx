import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Menu} from "antd";
import {FileDoneOutlined} from '@ant-design/icons';

export default function NavMenu({location, vertical}) {
  const {pathname} = location;
  return (
    <Menu
      mode={vertical ? 'inline' : 'horizontal'}
      selectedKeys={pathname.split('/')}
      defaultOpenKeys={['tools']}
    >
      <Menu.SubMenu key="tools" title="Tools">
        <Menu.Item key="scene-negotiation" icon={<FileDoneOutlined/>}>
          <Link to="/tools/scene-negotiation">
            Scene Negotiation
          </Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
}

NavMenu.defaultProps = {
  vertical: false,
};

NavMenu.propTypes = {
  vertical: PropTypes.bool,
};
