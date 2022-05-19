import React from 'react';
import {Outlet, useNavigate, useMatch} from 'react-router-dom';
import {PageHeader, Spin} from 'antd';
import api from '../services/scene-negotiation-api';

export default function Entry() {
    const navigate = useNavigate();
    const {params} = useMatch('/tools/scene-negotiation/:type') || {params: {}};

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
            <PageHeader
                title={params.type || 'Scene Negotiation'}
                onBack={params.type ? () => navigate('.') : undefined}
            />
            {loading && <Spin size="large"/>}
            {!loading && <Outlet context={{templates}}/>}
        </React.Fragment>
    )
}