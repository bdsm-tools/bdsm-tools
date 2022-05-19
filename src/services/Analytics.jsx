import React from 'react';
import ReactGA from "react-ga";
import {useLocation} from 'react-router-dom';

export default function Analytics() {
    const location = useLocation();
    React.useEffect(() => {
        ReactGA.initialize('UA-175178769-1');
    }, []);
    React.useEffect(() => {
        ReactGA.pageview(location.pathname + location.search);
    }, [location.pathname, location.search]);
    return null;
}