import React from 'react';
import { Typography } from 'antd';

const issueLink =
  'https://github.com/keepsafemaster/bdsm-tools/issues/new/choose';
const IssueLink = ({ text }) => (
  <Typography.Link href={issueLink}>{text || issueLink}</Typography.Link>
);

export default IssueLink;
