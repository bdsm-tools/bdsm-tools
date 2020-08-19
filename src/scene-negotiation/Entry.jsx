import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Typography, Empty, PageHeader, Spin, Input, Select} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import _ from 'lodash';
import api from '../services/scene-negotiation-api';
import NegotiationCard from "./NegotiationCard";

const NegotiationForm = React.lazy(() =>
  import(/* webpackChunkName: "NegotiationForm", webpackPrefetch: true */ './NegotiationForm')
);

export default function Entry(props) {
  const {match, history, location} = props;
  const {url} = match;
  const params = new URLSearchParams(location.search);

  const [loading, setLoading] = React.useState(false);
  const [templates, setTemplates] = React.useState([]);
  const [search, setSearch] = React.useState(params.get('search') || '');
  const [searchType, setSearchType] = React.useState(params.get('searchType') || 'including');
  const applySearch = e => setSearch(e.target.value);
  const filterTemplates = ({ title, description }) => {
    switch (searchType) {
      case 'regex':
        try {
          const regex = new RegExp(search);
          return search === ''
            || regex.test(title || '')
            || regex.test(description || '');
        } catch (e) {}
      case "including":
        return search === ''
          || (title || '').toLowerCase().includes(search.toLowerCase())
          || (description || '').toLowerCase().includes(search.toLowerCase());
      default:
        return false;
    }
  }

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
                  This tools facilitates a user in their negotiation with their play partner(s).
                  Based on the chosen template, a selection of questions will be posed. The goal
                  being to understand the limits and desires of the user.
                </Typography.Paragraph>
                <Typography.Paragraph>
                  Choose a Negotiation Template:
                </Typography.Paragraph>
              </Typography>
              {templates && templates.length > 10 &&
                <Input
                  placeholder="Search for templates"
                  prefix={<SearchOutlined />}
                  value={search}
                  onChange={applySearch}
                  style={{ minWidth: 330 }}
                  addonAfter={(
                    <Select value={searchType} onChange={setSearchType}>
                      <Select.Option value="including">
                        Including
                      </Select.Option>
                      <Select.Option value="regex">
                        Regex
                      </Select.Option>
                    </Select>
                  )}
                />
              }
              <div style={{ display: 'flex' }}>
                {(templates || []).filter(filterTemplates).map((template) => (
                  <NegotiationCard
                    key={template.id}
                    {...template}
                    onClick={() => history.push(`${url}/${template.title}`)}
                  />
                ))}
              </div>
            </React.Fragment>
          );
        }}/>
      </Switch>
    </React.Fragment>
  )
}