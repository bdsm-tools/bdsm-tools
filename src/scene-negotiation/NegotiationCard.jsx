import React from 'react';
import { Card, Button, Typography } from 'antd';
import { DiffOutlined } from "@ant-design/icons";

export default function NegotiationCard(props) {
  return (
    <Card
      type="inner"
      style={{ margin: 15, width: '30%' }}
      title={props.title}
    >
      <Typography>
        <Typography.Paragraph>
          {props.description || '<No Description>'}
        </Typography.Paragraph>
      </Typography>
      <Button
        icon={<DiffOutlined />}
        style={{ width: '100%' }}
        onClick={props.onClick}
      >
        Create
      </Button>
    </Card>
  );
}
