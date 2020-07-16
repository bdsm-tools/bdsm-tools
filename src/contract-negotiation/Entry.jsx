import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import { Typography } from 'antd';

export default function Entry(props) {
    return (
        <React.Fragment>
            <Typography>
                <Typography.Title level={2}>Contract Negotiation</Typography.Title>
            </Typography>
            <Switch>
                <Route>

                </Route>
            </Switch>
        </React.Fragment>
    )
}