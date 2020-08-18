import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Typography, Button, Empty, PageHeader, Spin} from 'antd';
import api from '../services/scene-negotiation-api';

const NegotiationForm = React.lazy(() =>
  import(/* webpackChunkName: "NegotiationForm", webpackPrefetch: true */ './NegotiationForm')
);

export default function Entry(props) {
  const {match, history} = props;
  const {url} = match;
  const [loading, setLoading] = React.useState(false);
  const [templates, setTemplates] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    api.getNegotiationTypes()
      .then(setTemplates)
      .then(() => setLoading(false));
  }, []);

  return (
    <React.Fragment>
      <Switch>
        <Route path={`${url}/:type?`} render={(routeProps) => (
          <PageHeader
            title={routeProps.match.params.type || 'Scene Negotiation'}
            onBack={routeProps.match.params.type
              ? () => history.push(url)
              : undefined
            }
          />
        )}/>
      </Switch>
      <Switch>
        <Route path={`${url}/:type?`} render={(routeProps) => {
          const {type} = routeProps.match.params;

          if (type) {
            const [template] = type
              ? (templates || []).filter(({title}) => type === title)
              : [];
            return (
              <NegotiationForm
                {...routeProps}
                template={template}
              />
            );
          }
          if (loading) {
            return <Spin size="large" />
          }
          if (!templates || templates.length === 0) {
            return (
              <Empty
                description="There are no active Scene Negotiation Templates"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
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
              {(templates || []).map(({title}) => (
                <Button key={title} onClick={() => history.push(`${url}/${title}`)}>
                  {title}
                </Button>
              ))}
            </React.Fragment>
          );
        }}/>
      </Switch>
    </React.Fragment>
  )
}