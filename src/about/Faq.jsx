import React from 'react';
import {PageHeader, Typography, Collapse} from 'antd';
import IssueLink from "./IssueLink";
import useAnalytics from '../hooks/useAnalytics'

export default function Faq() {
  useAnalytics('FAQ');
  return (
    <React.Fragment>
      <PageHeader title="FAQ"/>
      <Collapse bordered={false}>
        <Collapse.Panel key="1" header="How can I report a bug with the site?">
          <Typography>
            <Typography.Paragraph>
              You can report bugs to me here: <IssueLink />
            </Typography.Paragraph>
          </Typography>
        </Collapse.Panel>
        <Collapse.Panel key="2" header="How can I ask for a new tool?">
          <Typography>
            <Typography.Paragraph>
              You can ask me to implement a new tool or feature here: <IssueLink />
            </Typography.Paragraph>
          </Typography>
        </Collapse.Panel>
        {/*<Collapse.Panel key="3" header="This site is cool, do you accept donations?">*/}
        {/*  <Typography>*/}
        {/*    <Typography.Paragraph>*/}
        {/*      Yes, I graciously accept donations. You can donate to me here:*/}
        {/*    </Typography.Paragraph>*/}
        {/*  </Typography>*/}
        {/*</Collapse.Panel>*/}
        <Collapse.Panel key="4" header="Why are there so few tools available?">
          <Typography>
            <Typography.Paragraph>
              Unfortunately it's because I am only doing this in my spare time. Plus
              it's hard to think of new ideas. If you have an idea, please contact me
              by raising an issue here: <IssueLink />
            </Typography.Paragraph>
          </Typography>
        </Collapse.Panel>
      </Collapse>
    </React.Fragment>
  );
}