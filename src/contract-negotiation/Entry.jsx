import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Typography, Button, Empty, PageHeader } from 'antd';
import Contract from "./Contract";
import templates from '../data/templates';

export default function Entry(props) {
    const { match, history } = props;
    const { url } = match;
    return (
        <React.Fragment>
            <Switch>
                <Route path={`${url}/:type?`} render={(routeProps) => (
                    <PageHeader
                        title={routeProps.match.params.type || 'Contract Negotiation'}
                        onBack={routeProps.match.params.type
                            ? () => history.push(url)
                            : undefined
                        }
                    />
                )} />
            </Switch>
            <Switch>
                <Route path={`${url}/:type?`} render={(routeProps) => {
                    const { type } = routeProps.match.params;
                    const [ template ] = type
                        ? templates.filter(({ title }) => type === title)
                        : [];
                    if (template) {
                        return (
                            <Contract
                                {...routeProps}
                                template={template}
                            />
                        );
                    }
                    return (
                        <React.Fragment>
                            <Typography>
                                <Typography.Paragraph>
                                    Choose a contract to create:
                                </Typography.Paragraph>
                            </Typography>
                            {(!templates || templates.length === 0) &&
                                <Empty
                                    description={`There's no contract template with name: ${type}`}
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                            }
                            {templates.map(({ title }) => (
                                <Button key={title} onClick={() => history.push(`${url}/${title}`)}>
                                    {title}
                                </Button>
                            ))}
                        </React.Fragment>
                    );
                }} />
            </Switch>
        </React.Fragment>
    )
}