import axios from 'axios';
import queryString from 'query-string';
import Cookies from 'js-cookie';
import moment from 'moment';
import { captureHeader } from '../state/useGlobalHeader';

const baseUrl = process.env.SLAVE_TRAINING_API_ROOT;

Cookies.set('timezoneOffset', String(moment().utcOffset()), { SameSite: 'None', Secure: true, Domain: '.bdsmtools.org' });

const get = (url) => axios.get(baseUrl + url, {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
  },
  withCredentials: true,
})
  .then(captureHeader('x-bdsmtools-slave-task-count'))
  .then(res => res.data);

const post = (url, body) => axios.post(baseUrl + url, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: body ? JSON.stringify(body) : undefined,
  credentials: true,
})
  .then(captureHeader('x-bdsmtools-slave-task-count'))
  .then(res => res.data);

const getStats = () => get('/stats');
const getTask = (bodyPart) => bodyPart ? get(`/task?${queryString.stringify({ bodyPart })}`) : get(`/task`);
const getDailyTask = () => get('/daily-task');
const completeTask = (taskId, bonus, daily = false) => post(`/complete-task?${queryString.stringify({ id: taskId, bonus, daily })}`);
const failTask = (taskId, bonus, daily = false) => post(`/fail-task?${queryString.stringify({ id: taskId, bonus, daily })}`);

export default {
  getStats,
  getTask,
  getDailyTask,
  completeTask,
  failTask,
}
