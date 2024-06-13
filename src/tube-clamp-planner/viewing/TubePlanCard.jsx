import React from 'react';
import { Button, Card, Image, Tooltip, Typography } from 'antd'
import { DeleteOutlined, DownloadOutlined, DiffOutlined, TabletOutlined } from '@ant-design/icons';
import { useLocalStorageState } from 'ahooks';
import { useNavigate } from 'react-router';
import { downloadJSON } from '../../util'

export default function TubePlanCard({ sceneId, onDelete }) {
  const navigate = useNavigate();
  const [tubePlan] = useLocalStorageState(`tube-plan-${sceneId}`);

  return (
    <Card
      type="inner"
      style={{ margin: 15, width: '25%', minWidth: 300 }}
      title={(
        <>
          {tubePlan.title || 'Untitled Plan'}
          <Tooltip title='Data is stored locally on your browser and can only be seen by you'>
            <TabletOutlined style={{ marginLeft: 10 }} />
          </Tooltip>
        </>
      )}
      extra={(
        <>
          <Tooltip title='Download'>
            <Button
              shape="circle"
              icon={<DownloadOutlined />}
              onClick={() => downloadJSON(tubePlan, `${tubePlan.title}.tube`)}
            />
          </Tooltip>
          <Tooltip title='Delete'>
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {
                onDelete();
                localStorage.removeItem(`scene-plan-${sceneId}`);
              }}
              style={{ marginLeft: 5 }}
            />
          </Tooltip>
        </>
      )}
    >
      <Typography>
        <Typography.Paragraph>
          {tubePlan.description || '<No Description>'}
        </Typography.Paragraph>
      </Typography>
      {tubePlan.previewImage && (
        <div style={{ aspectRatio: 3 / 2, overflowY: 'auto' }}>
          <Image width='100%' src={tubePlan.previewImage}/>
        </div>
      )}
      {!tubePlan.previewImage && (
        <Typography>
          <Typography.Paragraph>
            {'<No Preview>'}
          </Typography.Paragraph>
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
  )
}