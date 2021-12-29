import React from 'react';
import {Typography, Divider, List, Button} from 'antd';

export default function Home({history}) {
    return (
        <div style={{marginTop: 30}}>
            <Typography>
                <Typography.Title level={2}>BDSM Tools</Typography.Title>
                <Typography.Paragraph style={{maxWidth: 500}}>
                    This is a site with a bunch of tools for people who enjoy BDSM.
                    Unfortunately there is currently only one tool available, please
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
                    onClick={() => history.push('/tools/scene-negotiation')}
                >
                    Scene Negotiations
                </Button>
                <Button
                    size='large'
                    onClick={() => history.push('/tools/bdsm-scenarios')}
                >
                    Scenario Picker
                </Button>
            </div>
        </div>
    );
}