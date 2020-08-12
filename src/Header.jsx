import React from 'react';
import { PageHeader, Tag, Affix } from "antd";
import { DeploymentUnitOutlined } from '@ant-design/icons';
import { version } from '../package.json';

export default function Header({location, history}) {
  const {pathname} = location;
  const back = () => history.push('/');
  return (
    <Affix offsetTop={0}>
      <PageHeader
        title="BDSM Tools"
        onBack={pathname !== '/' ? back : undefined}
        tags={<Tag color="red">{version}</Tag>}
        avatar={{ icon: <DeploymentUnitOutlined /> }}
      />
    </Affix>
  );
}
