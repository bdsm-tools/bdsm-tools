import queryString from 'query-string';

const baseUrl = 'https://europe-west2-bdsm-tools.cloudfunctions.net/scene-negotiation';
const get = (url) => fetch(baseUrl + url, {
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
}).then(res => res.json());

const getNegotiationTypes = () => get('/negotiation-types');
const getNegotiationType = (id) => get(`/negotiation-types?${queryString.stringify({ id })}`);
const getNegotiation = (id) => get(`/negotiation?${queryString.stringify({ id })}`);

export default {
  getNegotiationTypes,
  getNegotiationType,
  getNegotiation,
}
