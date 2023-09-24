import React from 'react'
import { Button, Card, Tooltip, Typography } from 'antd'
import { DeleteOutlined, DownloadOutlined, DiffOutlined } from '@ant-design/icons'
import { useLocalStorageState } from 'ahooks';
import { useNavigate } from 'react-router'
import { extractPlanData } from './util'
import { downloadJSON } from '../util'

export default function ScenePlanCard(props) {
  const navigate = useNavigate();
  const [, id] = extractPlanData(props.id);
  const [scenePlan] = useLocalStorageState(`scene-plan-${id}`, { defaultValue: {}});
  return (
    <Card
      type="inner"
      style={{ margin: 15, width: '30%', minWidth: 300 }}
      title={scenePlan.title || 'Untitled Plan'}
      extra={(
        <Tooltip title='Download'>
          <Button
            shape="circle"
            icon={<DownloadOutlined />}
            onClick={() => downloadJSON(scenePlan, `${scenePlan.title}.json`)}
          />
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              props.onDelete();
              localStorage.removeItem(`scene-plan-${id}`);
            }}
          />
        </Tooltip>
      )}
    >
      <Typography>
        <Typography.Paragraph>
          {scenePlan.description || '<No Description>'}
        </Typography.Paragraph>
      </Typography>
      <Button
        icon={<DiffOutlined />}
        style={{ width: '100%' }}
        onClick={() => navigate(`/tools/scene-planner/${props.id}`)}
      >
        View / Edit
      </Button>
    </Card>
  )
}