import React from 'react';
import {PageHeader, Typography, Collapse} from 'antd';
import IssueLink from "./IssueLink";

export default function Entry() {
  return (
    <React.Fragment>
      <PageHeader
        title="About"
      />
      <Collapse
        activeKey={['whatsthis', 'datapolicy', 'donate', 'contactus']}
        bordered={false}
        expandIcon={() => null}
        expandIconPosition="right"
      >
        <Collapse.Panel key="whatsthis" header="What is this?">
          <Typography>
            <Typography.Paragraph>
              This is an application that provides tools to people who are interested in BDSM
              and/or part of a BDSM relationship. This site does not give any guidance to any
              practices, only facilitates them. Please practice BDSM responsibly, there's plenty
              of guidance out there.
            </Typography.Paragraph>
          </Typography>
        </Collapse.Panel>
        <Collapse.Panel key="datapolicy" header="Data Policy">
          <Typography>
            <Typography.Paragraph>
              Any data stored by this site is not personally identifiable unless the data you enter
              personally identifies you. If you want any of your data to be removed from the site
              I am happy to do that. Please raise an issue here: <IssueLink />
            </Typography.Paragraph>
            <Typography.Paragraph>

            </Typography.Paragraph>
          </Typography>
        </Collapse.Panel>
        {/*<Collapse.Panel key="donate" header="Donate">*/}
        {/*  <Typography>*/}
        {/*    <Typography.Paragraph>*/}
        {/*      Please consider donating to me if you use any of the tools on this site. I do this*/}
        {/*      in my own time and not paid for it.*/}
        {/*    </Typography.Paragraph>*/}
        {/*  </Typography>*/}
        {/*</Collapse.Panel>*/}
        <Collapse.Panel key="contactus" header="Contact Us">
          <Typography>
            <Typography.Paragraph>
              If you have an idea for a tool that can be added to this site, I'd
              be happy to hear it. Even if it's just an idea. Please raise an issue
              here: <IssueLink />
            </Typography.Paragraph>
            <Typography.Paragraph>
              {`If you wish to contact me for any other reason relating to this site
              you can email: `}
              <Typography.Link href="mailto:keepsafemaster@gmail.com">
                keepsafemaster@gmail.com
              </Typography.Link>
            </Typography.Paragraph>
          </Typography>
        </Collapse.Panel>
      </Collapse>
    </React.Fragment>
  );
}