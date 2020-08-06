const baseUrl = '';
const get = (url) => fetch(baseUrl + url);

const getContractTypes = () => get('/contract-types');
const getContractType = (id) => get(`/contract-type/${id}`);
const getContract = (id) => get(`/contract/${id}`);

export default {
  getContractTypes,
  getContractType,
  getContract,
}
