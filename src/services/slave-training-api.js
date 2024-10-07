import axios from 'axios';
import queryString from 'query-string';
import Cookies from 'js-cookie';
import moment from 'moment';
import { captureHeader } from '../state/useGlobalHeader';

const baseUrl = process.env.SLAVE_TRAINING_API_ROOT;

Cookies.set('timezoneOffset', String(moment().utcOffset()), {
  SameSite: 'None',
  Secure: true,
  Domain: '.bdsmtools.org',
});

const get = (url) =>
  axios
    .get(baseUrl + url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      withCredentials: true,
    })
    .then(captureHeader('x-bdsmtools-slave-task-count'))
    .then((res) => res.data);

const post = (url, body) =>
  axios
    .post(baseUrl + url, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then(captureHeader('x-bdsmtools-slave-task-count'))
    .then((res) => res.data);

const postText = (url, body) => axios.post(baseUrl + url, body, {
  headers: {
    'Content-Type': 'text/plain',
  },
  withCredentials: true,
}).then(res => res.data);

const getStats = () => get('/stats');
const getTask = (bodyPart) =>
  bodyPart ? get(`/task?${queryString.stringify({ bodyPart })}`) : get(`/task`);
const getDailyTask = () => get('/daily-task');
const completeTask = (taskId, bonus, daily = false) =>
  post(`/complete-task?${queryString.stringify({ id: taskId, bonus, daily })}`);
const failTask = (taskId, bonus, daily = false) =>
  post(`/fail-task?${queryString.stringify({ id: taskId, bonus, daily })}`);
const giveFeedback = (taskId, rating, feedback) => postText(`/feedback?${queryString.stringify({ taskId, rating })}`, feedback);

export default {
  getStats,
  getTask,
  getDailyTask,
  completeTask,
  failTask,
  giveFeedback,
};
