import queryString from 'query-string';

const baseUrl = 'https://europe-west2-bdsm-tools.cloudfunctions.net/scene-negotiation';
const get = (url) => fetch(baseUrl + url, {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
  },
}).then(res => res.json());

const post = (url, body) => fetch(baseUrl + url, {
  method: 'POST',
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
  },
  body: JSON.stringify(body),
}).then(res => res.json());

const getNegotiationTypes = () => get('/negotiation-types');
const getNegotiationType = (id) => get(`/negotiation-types?${queryString.stringify({ id })}`);
const getNegotiation = (id) => get(`/negotiation?${queryString.stringify({ id })}`);

const saveNegotiation = (data) => post('/negotiation', data);

export default {
  getNegotiationTypes,
  getNegotiationType,
  getNegotiation,
  saveNegotiation,
}
