import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { PageHeader, Result, Button } from 'antd';
import ViewingTemplates from "./ViewingTemplates";
import api from '../services/scene-negotiation-api';
import testTemplate from '../data/kink-template';
import NegotiationCard from "./NegotiationCard";

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
        <Route path={`${url}/:type`} render={(routeProps) => {
          const { type } = routeProps.match.params;
          const [template] = (templates || [])
            .filter(({ title }) => type === title);

          if (type === '__testing__') {
            console.log('Testing Template:', testTemplate,);
            return (
              <NegotiationForm
                {...routeProps}
                template={testTemplate}
              />
            );
          }
          if (template) {
            return (
              <NegotiationForm
                {...routeProps}
                template={template}
              />
            );
          }
          return (
            <Result
              status={404}
              title='Not Found'
              subTitle={`There is no Scene Negotiation type called: '${type}'`}
              extra={(
                <Button
                  type='primary'
                  onClick={() => routeProps.history.push(url)}
                >
                  Choose a Template
                </Button>
              )}
            />
          )
        }}/>
        <Route path={`${url}`} render={(routeProps) => (
          <ViewingTemplates
            templates={templates}
            loading={loading}
            {...routeProps}
          />
        )}/>
      </Switch>
    </React.Fragment>
  )
}