import React from 'react';
import { Button, Card, Image, Popconfirm, Tooltip, Typography } from 'antd';
import {
  DeleteOutlined,
  DownloadOutlined,
  DiffOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import { useLocalStorageState } from 'ahooks';
import { useNavigate } from 'react-router';
import { downloadJSON } from '../../util';
import ReactGA from 'react-ga4';

export default function TubePlanCard({ sceneId, onDelete }) {
  const navigate = useNavigate();
  const [tubePlan] = useLocalStorageState(`tube-plan-${sceneId}`);

  return (
    <Card
      type='inner'
      style={{ margin: 15, width: '25%', minWidth: 300 }}
      title={
        <>
          {tubePlan.title || 'Untitled Plan'}
          <Tooltip title='Data is stored locally on your browser and can only be seen by you'>
            <TabletOutlined style={{ marginLeft: 10 }} />
          </Tooltip>
        </>
      }
      extra={
        <>
          <Tooltip title='Download'>
            <Button
              shape='circle'
              icon={<DownloadOutlined />}
              onClick={() => {
                downloadJSON(tubePlan, `${tubePlan.title}.tube`);
                ReactGA.event('download_tube_plan', {
                  title: tubePlan.title,
                });
              }}
            />
          </Tooltip>
          <Tooltip title='Delete'>
            <Popconfirm
              title="Are you sure to delete this design?"
              onConfirm={() => {
                onDelete();
                localStorage.removeItem(`tube-plan-${sceneId}`);

                ReactGA.event('delete_tube_plan', {
                  title: tubePlan.title,
                });
              }}
              okType='danger'
              okText="Delete"
              cancelText="Cancel"
            >
            <Button
              shape='circle'
              icon={<DeleteOutlined />}
              style={{ marginLeft: 5 }}
            />
            </Popconfirm>
          </Tooltip>
        </>
      }
    >
      <Typography>
        <Typography.Paragraph>
          {tubePlan.description || '<No Description>'}
        </Typography.Paragraph>
      </Typography>
      {tubePlan.previewImage && (
        <div style={{ aspectRatio: 3 / 2, overflowY: 'auto' }}>
          <Image width='100%' height="100%" src={tubePlan.previewImage} />
        </div>
      )}
      {!tubePlan.previewImage && (
        <Typography>
          <Typography.Paragraph>{'<No Preview>'}</Typography.Paragraph>
        </Typography>
      )}

      <Button
        icon={<DiffOutlined />}
        style={{ width: '100%', marginTop: 10 }}
        onClick={() => navigate(sceneId)}
      >
        View / Edit
      </Button>
    </Card>
  );
}
