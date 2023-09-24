import React from 'react';
import testTemplate from "../data/kink-template";
import {Button, Result} from "antd";
import {useMatch, useNavigate, useOutletContext} from "react-router-dom";

const NegotiationForm = React.lazy(() =>
    import(/* webpackChunkName: "NegotiationForm", webpackPrefetch: true */ './NegotiationForm')
);

export default function NegotiationFormWrapper() {
    const { templates } = useOutletContext();
    const navigate = useNavigate();
    const { params } = useMatch('/tools/scene-negotiation/:type');
    const { type } = params;
    const [template] = (templates || [])
        .filter(({ title }) => type === title);

    if (type === '__testing__') {
        console.log('Testing Template:', testTemplate);
        return (
            <NegotiationForm template={testTemplate}/>
        );
    }
    if (template) {
        return (
            <NegotiationForm template={template}/>
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
                    onClick={() => navigate('..')}
                >
                    Choose a Template
                </Button>
            )}
        />
    )
}