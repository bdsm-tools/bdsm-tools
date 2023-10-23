import React from 'react';
import {Layout, Spin} from 'antd';
import {BrowserRouter as Router, Routes as Routing, Route, Outlet} from 'react-router-dom';
import ReactGA from 'react-ga4'
import Header from './Header';
import NavMenu from "./NavMenu";
import ConsentModal from "./ConsentModal";
import ScenarioTable from "./scenario-picker/ScenarioTable";
import ScenarioEntry from "./scenario-picker/ScenarioEntry";
import NegotiationFormWrapper from "./scene-negotiation/NegotiationFormWrapper";
import ViewingTemplates from "./scene-negotiation/ViewingTemplates";

ReactGA.initialize('G-SKBSEEBLCP');

const SceneNegotiationEntry = React.lazy(() =>
    import(/* webpackChunkName: "SceneNegotiation", webpackPrefetch: true */ './scene-negotiation/Entry')
);

const ScenarioPickerEntry = React.lazy(() =>
    import(/* webpackChunkName: "ScenarioPicker", webpackPrefetch: true */ './scenario-picker/Entry')
);

const AboutEntry = React.lazy(() =>
    import(/* webpackChunkName: "About", webpackPrefetch: true */ './about/Entry')
);

const FaqEntry = React.lazy(() =>
    import(/* webpackChunkName: "FAQ", webpackPrefetch: true */ './about/Faq')
);

const Home = React.lazy(() =>
    import(/* webpackChunkName: "Home", webpackPrefetch: true */ './Home')
);

export default function Application() {
    return (
        <Router>
            <Routing>
                <Route path='/' element={<ConsentModal/>}/>
            </Routing>
            <Routing>
                <Route path='/' element={<AppLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="about/faq" element={<FaqEntry/>}/>
                    <Route path="about/info" element={<AboutEntry/>}/>
                    <Route path="tools/scene-negotiation" element={<SceneNegotiationEntry/>}>
                        <Route index element={<ViewingTemplates />} />
                        <Route path=':type' element={<NegotiationFormWrapper/>} />
                    </Route>
                    <Route path="tools/bdsm-scenarios" element={<ScenarioPickerEntry/>}>
                        <Route index element={<ScenarioTable />}/>
                        <Route path=':type' element={<ScenarioEntry/>} />
                    </Route>
                </Route>
            </Routing>
        </Router>
    );
}

function AppLayout() {
    return (
        <Layout className="fullpage hideoverflow">
            <Layout.Header className="header">
                <Header/>
            </Layout.Header>
            <Layout.Content className="fullpage-w" style={{paddingTop: 64}}>
                <Layout>
                    <Layout.Sider width={250}>
                        <NavMenu vertical/>
                    </Layout.Sider>
                    <Layout.Content className="content">
                        <React.Suspense fallback={<Spin size="large"/>}>
                            <Outlet/>
                        </React.Suspense>
                    </Layout.Content>
                </Layout>
            </Layout.Content>
        </Layout>
    );
}
