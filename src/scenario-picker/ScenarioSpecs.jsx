import React from 'react';
import { Divider, Typography, Row, Col, Card, Statistic } from 'antd';
import Tags from '../components/Tags';
import participantColourFunction from './participantColourFunction';

export default function ScenarioSpecs({ scene }) {
  return (
    <>
      <div className='flex space-between'>
        <div style={{ marginRight: 100 }}>
          <Typography.Title level={2}>Scenario</Typography.Title>
          <Typography.Paragraph>
            {scene.description || '<No Description>'}
          </Typography.Paragraph>
        </div>
        <Statistic
          title='Number of Participants'
          value={scene.participantCount}
        />
      </div>

      <Row style={{ marginBottom: 10 }}>
        <Col xs={24} md={12}>
          <div style={{ paddingRight: 10 }}>
            <Card title='Compatible Participants'>
              <Tags
                values={scene.participants}
                colourFunction={participantColourFunction}
              />
            </Card>
            <Card title='Location' style={{ marginTop: 10 }}>
              {scene.location}
            </Card>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ paddingRight: 10 }}>
            <Card title='Equipment'>
              <Typography>Required Equipment:</Typography>
              <ul>
                {scene.requiredEquipment.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
              <Divider />
              <Typography>Optional Equipment:</Typography>
              <ul>
                {scene.optionalEquipment.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </Card>
          </div>
        </Col>
      </Row>

      <Divider />
    </>
  );
}
