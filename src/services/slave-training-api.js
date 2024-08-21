import queryString from 'query-string';

const baseUrl = process.env.SLAVE_TRAINING_API_ROOT;
const get = (url) => fetch(baseUrl + url, {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
  },
  credentials: 'include',
}).then(res => res.json());

const getTask = (bodyPart) => bodyPart ? get(`/task?${queryString.stringify({ bodyPart })}`) : get(`/task`);
const getDailyTask = () => get(`/daily-task`);

export default {
  getTask,
  getDailyTask,
}
