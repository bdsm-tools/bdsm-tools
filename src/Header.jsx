import React from 'react';
import {Menu, PageHeader} from "antd";
import {Link} from "react-router-dom";

export default function Header({ location, history }) {
    const { pathname } = location;
    const back = () => history.push('/');
    return (
        <React.Fragment>
            <PageHeader title="BDSM Tools" onBack={pathname !== '/' ? back : undefined} />
            <Menu mode="horizontal" selectedKeys={pathname.split('/')}>
                <Menu.Item key="contract-negotiation">
                    <Link to="/contract-negotiation">
                        Contract Negotiation
                    </Link>
                </Menu.Item>
            </Menu>
        </React.Fragment>
    );
}