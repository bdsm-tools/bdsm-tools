import React from 'react'
import { Layout, Spin, Button, Result, Alert } from 'antd'
import moment from 'moment'
import { useLocalStorageState } from 'ahooks';
import { BrowserRouter as Router, Routes as Routing, Route, Outlet, useMatch } from 'react-router-dom'
import ReactGA from 'react-ga4'
import Header from './Header'
import NavMenu from './NavMenu'
import ConsentModal from './ConsentModal'
import ScenarioTable from './scenario-picker/ScenarioTable'
import ScenarioEntry from './scenario-picker/ScenarioEntry'
import NegotiationFormWrapper from './scene-negotiation/NegotiationFormWrapper'
import ViewingTemplates from './scene-negotiation/ViewingTemplates'
import api from './services/feature-flag-api'
import ScenePlannerDashboard from './scene-planner/ScenePlannerDashboard'
import ScenePlanViewer from './scene-planner/ScenePlanViewer'

ReactGA.initialize('G-SKBSEEBLCP')

const SceneNegotiationEntry = React.lazy(() =>
  import(/* webpackChunkName: "SceneNegotiation", webpackPrefetch: true */ './scene-negotiation/Entry')
)

const ScenarioPickerEntry = React.lazy(() =>
  import(/* webpackChunkName: "ScenarioPicker", webpackPrefetch: true */ './scenario-picker/Entry')
)

const ScenePlannerEntry = React.lazy(() =>
    import(/* webpackChunkName: "ScenarioPicker", webpackPrefetch: true */ './scene-planner/Entry')
);

const AboutEntry = React.lazy(() =>
  import(/* webpackChunkName: "About", webpackPrefetch: true */ './about/Entry')
)

const FaqEntry = React.lazy(() =>
  import(/* webpackChunkName: "FAQ", webpackPrefetch: true */ './about/Faq')
)

const Home = React.lazy(() =>
  import(/* webpackChunkName: "Home", webpackPrefetch: true */ './Home')
)

export default function Application () {
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
          <Route path='tools' element={<FeatureFlagLayout/>}>
            <Route path="scene-negotiation" element={<SceneNegotiationEntry/>}>
              <Route index element={<ViewingTemplates/>}/>
              <Route path=':type' element={<NegotiationFormWrapper/>}/>
            </Route>
            <Route path="bdsm-scenarios" element={<ScenarioPickerEntry/>}>
              <Route index element={<ScenarioTable/>}/>
              <Route path=':type' element={<ScenarioEntry/>}/>
            </Route>
            <Route path="scene-planner" element={<ScenePlannerEntry/>}>
              <Route index element={<ScenePlannerDashboard />}/>
              <Route path=':sceneId' element={<ScenePlanViewer />} />
            </Route>
          </Route>
        </Route>
      </Routing>
    </Router>
  )
}

function AppLayout () {
  return (
    <Layout className="fullpage hideoverflow">
      <Layout.Header className="header">
        <Header/>
      </Layout.Header>
      <Layout.Content className="fullpage-w" style={{ paddingTop: 64 }}>
        <Layout>
          <Layout.Sider width={250}>
            <NavMenu vertical/>
          </Layout.Sider>
          <Layout.Content className="content">
            <React.Suspense fallback={<Spin size="large"/>}>
              <Alert.ErrorBoundary>
                <Outlet/>
              </Alert.ErrorBoundary>
            </React.Suspense>
          </Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  )
}

function FeatureFlagLayout() {
  const { params } = useMatch('/tools/:id*');

  const [id, setId] = React.useState(null);
  const [flag, setFlag] = React.useState(null);

  const [isDev] = useLocalStorageState('__dev__', {
    defaultValue: false,
  });
  const error = (e) => {
    console.error(e);
    setFlag({
      enabled: false,
      lastChanged: {
        _seconds: moment().seconds(),
      },
      reason: 'An error occurred when fetching this feature flag. Check the console for more details.'
    });
  };

  const check = (cache) => {
    setFlag(null);
    if (cache) {
      return api.getFeatureFlag(params.id)
        .then(setFlag)
        .catch(error);
    }
    return api.getFeatureFlagNoCache(params.id)
      .then(setFlag)
      .catch(error);
  }

  React.useEffect(() => {
    setId(null);
    check(true)
      .then(() => setId(params.id));
  }, [params.id]);

  if (!flag || id !== params.id) return <Spin size="large"/>
  if (flag.enabled) return <Outlet/>

  const time = moment(moment.duration(flag.lastChanged._seconds, 's'))
    .format('Do MMMM YYYY [at] hh:mm:ss')
  return (
    <Result
      status="error"
      title="This feature has been disabled"
      subTitle={`The feature has been disabled since the ${time}. The reason given is: ${flag.reason}`}
      extra={[
        <Button key='check-again' onClick={() => check(false)}>
          Check again
        </Button>,
        (isDev && (
          <Button key='bypass' onClick={() => setFlag({ enabled: true })}>
            Bypass
          </Button>
        ))
      ]}
    />
  );
}
