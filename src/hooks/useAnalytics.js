import React from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

export default function useAnalytics(title) {
  const location = useLocation();
  React.useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search, title });
  }, [location.pathname, location.search]);
}