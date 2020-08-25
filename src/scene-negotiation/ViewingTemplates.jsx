import React from 'react';
import { Typography, Empty, Spin, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import NegotiationCard from "./NegotiationCard";

export default function ({ location, history, match, templates, loading }) {
  const {url} = match;
  const params = new URLSearchParams(location.search);
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

  return (
    <React.Fragment>
      <Typography>
        <Typography.Paragraph>
          This tools facilitates a user in their negotiation with their play partner(s).
          Based on the chosen template, a selection of questions will be posed. The goal
          being to understand the limits and desires of the user. This data can be shared
          with others on completion.
        </Typography.Paragraph>
        <Typography.Paragraph>
          Choose a Negotiation Template:
        </Typography.Paragraph>
      </Typography>
      {loading && <Spin size="large" />}
      {!loading && (!templates || templates.length === 0) && (
        <Empty
          description="There are no active Scene Negotiation Templates"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
      {!loading && templates && templates.length > 10 &&
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
}