import React from 'react';
import {Typography} from 'antd';

export const {Paragraph: P, Title: H, Text} = Typography;

export const Optional = (props) => (
    <Text {...props} type='secondary'/>
);
export const H1 = (props) => (
    <H {...props} level={1}/>
);
export const H2 = (props) => (
    <H {...props} level={2}/>
);
export const H3 = (props) => (
    <H {...props} level={3}/>
);
export const H4 = (props) => (
    <H {...props} level={4}/>
);