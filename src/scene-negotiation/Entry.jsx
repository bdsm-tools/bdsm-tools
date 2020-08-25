import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { PageHeader } from 'antd';
import ViewingTemplates from "./ViewingTemplates";
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
        <Route path={`${url}/:type`} render={(routeProps) => {
          const { type } = routeProps.match.params;
          const [template] = type
            ? (templates || []).filter(({title}) => type === title)
            : [];
          return (
            <NegotiationForm
              {...routeProps}
              template={template}
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