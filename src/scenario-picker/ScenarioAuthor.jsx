import React from "react";
import {Divider, Typography, Avatar} from "antd";
import { UserOutlined } from '@ant-design/icons';
import Linkify from 'react-linkify';


export default function ScenarioAuthor({scene}) {
    return (
        <>
            <Divider style={{marginBottom: 2 }}/>
            <div className='flex' style={{ marginBottom: 100 }}>
                <Avatar shape="square" size="small" icon={<UserOutlined/>}/>
                <Typography.Paragraph style={{ marginLeft: 5}}>
                    <Linkify component={Typography.Link}>
                        Scenario written by: {scene.author || 'anonymous'}
                    </Linkify>
                </Typography.Paragraph>
            </div>
        </>
    )
}