import React from 'react'
import { Button, Card, Tooltip, Typography } from 'antd'
import { DeleteOutlined, DownloadOutlined, DiffOutlined } from '@ant-design/icons'
import { useLocalStorageState } from 'ahooks';
import { useNavigate } from 'react-router'
import { extractPlanData } from './util'
import { downloadJSON } from '../util'
import DatabaseIcon from '@ant-design/icons/DatabaseOutlined'
import LocalIcon from '@ant-design/icons/lib/icons/TabletOutlined'

export default function ScenePlanCard(props) {
  const navigate = useNavigate();
  const [source, id] = extractPlanData(props.id);
  const [scenePlan] = useLocalStorageState(`scene-plan-${id}`, { defaultValue: {}});
  return (
    <Card
      type="inner"
      style={{ margin: 15, width: '30%', minWidth: 300 }}
      title={(
        <>
          {scenePlan.title || 'Untitled Plan'}
          {source === 'shared' && (
            <Tooltip title='Data is stored on the server and can be shared'>
              <DatabaseIcon style={{ marginLeft: 10 }} />
            </Tooltip>
          )}
          {source === 'local' && (
            <Tooltip title='Data is stored locally on your browser and can only be seen by you'>
              <LocalIcon style={{ marginLeft: 10 }} />
            </Tooltip>
          )}
        </>
      )}
      extra={(
        <>
          <Tooltip title='Download'>
            <Button
              shape="circle"
              icon={<DownloadOutlined />}
              onClick={() => downloadJSON(scenePlan, `${scenePlan.title}.json`)}
            />
          </Tooltip>
          {source === 'local' && (
            <Tooltip title='Delete'>
              <Button
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => {
                  props.onDelete();
                  localStorage.removeItem(`scene-plan-${id}`);
                }}
                style={{ marginLeft: 5 }}
              />
            </Tooltip>
          )}
        </>
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