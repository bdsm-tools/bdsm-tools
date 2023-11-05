import React from 'react';
import {Typography, Divider, Button} from 'antd';
import { useNavigate } from 'react-router-dom';
import useAnalytics from './hooks/useAnalytics'

export default function Home() {
    useAnalytics('Home');
    const navigate = useNavigate();
    return (
        <div style={{marginTop: 30}}>
            <Typography>
                <Typography.Title level={2}>BDSM Tools</Typography.Title>
                <Typography.Paragraph style={{maxWidth: 500}}>
                    This is a site with a bunch of tools for people who enjoy BDSM.
                    Unfortunately there are limited tools available, please
                    get in touch if you have any ideas for more.
                </Typography.Paragraph>
            </Typography>
            <Divider orientation="left" style={{marginTop: 50}}>
                Featured Tools
            </Divider>
            <div className='flex'>
                <Button
                    size='large'
                    style={{ marginRight: 40 }}
                    onClick={() => navigate('/tools/scene-negotiation')}
                >
                    Scene Negotiations
                </Button>
                <Button
                    size='large'
                    style={{ marginRight: 40 }}
                    onClick={() => navigate('/tools/bdsm-scenarios')}
                >
                    Scenario Picker
                </Button>
            </div>
        </div>
    );
}