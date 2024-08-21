import queryString from 'query-string';
import Cookies from 'js-cookie';
import moment from 'moment';
import { captureHeader } from '../state/useGlobalHeader';

const baseUrl = process.env.SLAVE_TRAINING_API_ROOT;

Cookies.set('timezoneOffset', String(moment().utcOffset()), { SameSite: 'None', Secure: true, Domain: '.bdsmtools.org' });

const get = (url) => fetch(baseUrl + url, {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
  },
  credentials: 'include',
  mode: 'cors',
})
  .then(captureHeader('x-bdsmtools-slave-task-count'))
  .then(res => res.json());

const post = (url, body) => fetch(baseUrl + url, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: body ? JSON.stringify(body) : undefined,
  credentials: 'include',
  mode: 'cors',
})
  .then(captureHeader('x-bdsmtools-slave-task-count'))
  .then(res => res.json());

const getStats = () => get('/stats');
const getTask = (bodyPart) => bodyPart ? get(`/task?${queryString.stringify({ bodyPart })}`) : get(`/task`);
const getDailyTask = () => get('/daily-task');
const completeTask = (taskId) => post(`/complete-task?id=${taskId}`);
const failTask = (taskId) => post(`/fail-task?id=${taskId}`);

export default {
  getStats,
  getTask,
  getDailyTask,
  completeTask,
  failTask,
}
