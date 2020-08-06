import queryString from 'query-string';

const baseUrl = 'https://europe-west2-bdsm-tools.cloudfunctions.net/scene-negotiation';
const get = (url) => fetch(baseUrl + url);

const getContractTypes = () => get('/contract-types');
const getContractType = (id) => get(`/contract-type?${queryString.stringify({ id })}`);
const getContract = (id) => get(`/contract?${queryString.stringify({ id })}`);

export default {
  getContractTypes,
  getContractType,
  getContract,
}
