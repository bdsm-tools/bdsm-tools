import React from 'react';
import { Typography } from 'antd';

export const { Paragraph: P, Title: H, Text } = Typography;

export const Optional = (props) => <Text {...props} type='secondary' />; // jshint ignore:line
export const H1 = (props) => <H {...props} level={1} />; // jshint ignore:line
export const H2 = (props) => <H {...props} level={2} />; // jshint ignore:line
export const H3 = (props) => <H {...props} level={3} />; // jshint ignore:line
export const H4 = (props) => <H {...props} level={4} />; // jshint ignore:line
