import React from 'react';
import { Outlet, useNavigate, useMatch } from 'react-router-dom';
import { Spin } from 'antd';
import { PageHeader } from '@ant-design/pro-components';
import api from '../services/scene-negotiation-api';
import useAnalytics from '../hooks/useAnalytics';
import ChatScreen from './ChatScreen';

export default function Entry() {
  useAnalytics('Chastity Domme');
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <React.Fragment>
      <PageHeader
        title='Chastity Domme'
      />
      {loading && <Spin size='large' />}
      {!loading && <ChatScreen />}
    </React.Fragment>
  );
}
