import React from 'react';
import { PageHeader } from "antd";

export default function Header({ location, history }) {
    const { pathname } = location;
    const back = () => history.push('/');
    return (
        <PageHeader
            title="BDSM Tools"
            onBack={pathname !== '/' ? back : undefined}
        />
    );
}
