const baseUrl = process.env.FEATURE_FLAG_API_ROOT;
const get = (url, headers = {}) =>
  fetch(baseUrl + url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      ...headers,
    },
  }).then((res) => res.json());

const getEnabledFeatures = () => get(`/flag/enabled`);
const getFeatureFlag = (id) => get(`/flag/${id}`);
const getFeatureFlagNoCache = (id) =>
  get(`/flag/${id}`, {
    'Cache-Control': 'no-cache',
  });

export default {
  getEnabledFeatures,
  getFeatureFlag,
  getFeatureFlagNoCache,
};
