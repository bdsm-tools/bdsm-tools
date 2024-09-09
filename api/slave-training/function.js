const { MONGO_CLUSTER_PASSWORD, MONGO_CLUSTER_URI, MONGO_DB, SESSION_KEY_V1, SESSION_DOMAIN_OVERRIDE } = process.env;
if (!(MONGO_CLUSTER_PASSWORD && MONGO_CLUSTER_URI && MONGO_DB && SESSION_KEY_V1))
  throw new Error('Missing environment variables. '
    + `SESSION_KEY_V1: ${!!SESSION_KEY_V1}, `
    + `MONGO_CLUSTER_PASSWORD: ${!!MONGO_CLUSTER_PASSWORD}, `
    + `MONGO_CLUSTER_URI: ${!!MONGO_CLUSTER_URI}, `
    + `MONGO_DB: ${MONGO_DB}`);

const _ = require('lodash');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const crypto = require('crypto');
const moment = require('moment');

const FILTER_HASH_SALT = 'v1';

const requireSession = (handler) => async (req, res) => {
  if (!req.session || !req.session.id) {
    res.status(401).end();
  } else {
    return await handler(req, res);
  }
};

const createFilter = (bodyParts = [], equipment = []) => ({
  requiresBodyPart: { $not: { $elemMatch: { $nin: bodyParts } } },
  requiresEquipment: { $not: { $elemMatch: { $nin: equipment } } },
});

const hash = (...data) => crypto.createHash('md5').update(data.map((d) => JSON.stringify(d)).join('')).digest('hex');

const random = (min, max) => Math.round(Math.random() * (max - min) + min);

const uri = `mongodb+srv://bdsmtools-gcf:${MONGO_CLUSTER_PASSWORD}@${MONGO_CLUSTER_URI}?retryWrites=true&w=majority&appName=bdsmtools-db`;

let mongoClient;
const client = async () => {
  if (!mongoClient) {
    mongoClient = await MongoClient.connect(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    });
  }
  return mongoClient;
};

async function mongo (collection, func) {
    return await func((await client()).db(MONGO_DB).collection(collection));
}

async function updateStats(update) {
  return await mongo('stats', (collection) => {
    collection.updateOne(
      { _id: 'slave-training' },
      update,
      { upsert: true }
    )
  });
}

const slaveTrainingTasks = (req, res) => {
  const equipment = req.cookies['my-equipment']?.split('|') ?? [];
  const bodyParts = req.cookies['body-parts']?.split('|') ?? [];

  return ({
    async getTask (bodyPart) {
      if (!bodyPart) {
        res.status(400).send('Missing "bodyPart" parameter');
        return;
      }
      if (equipment.length === 0) {
        res.status(400).send('Missing "equipment" cookie');
        return;
      }

      if (!req.session?.slaveTask?.getTask)
        _.set(req.session, 'slaveTask.getTask', {});

      const filter = createFilter([bodyPart], equipment);

      const queryHash = hash(filter, FILTER_HASH_SALT);

      if (req.session.slaveTask.getTask.queryHash === queryHash && req.session.slaveTask.getTask.queryCount === 0) {
        res.status(400).send('No tasks match the equipment / body parts selected');
      } else {
        const [result] = await mongo('slave-training-tasks', async (collection) => {
          if (req.session.slaveTask.getTask.queryHash !== queryHash) {
            req.session.slaveTask.getTask.queryHash = queryHash;
            req.session.slaveTask.getTask.queryCount = await collection.countDocuments(filter);
          }
          if (req.session.slaveTask.getTask.queryCount === 0) {
            res.status(400).send('No tasks match the equipment / body parts selected');
            return [];
          }

          const taskNumber = random(0, req.session.slaveTask.getTask.queryCount);

          return await collection.find(filter, { sort: { 'added': 1 }, limit: 1, skip: taskNumber }).toArray();
        });

        if (result) {
          res.status(200)
            .header('x-bdsmtools-slave-task-count', req.session.slaveTask.getTask.queryCount)
            .json(result);

          await updateStats({ $inc: { [`randomTask.${bodyPart}`]: 1 } });
        }
      }
    },
    async getRandomTask () {
      if (equipment.length === 0) {
        res.status(400).send('Missing "equipment" cookie');
        return;
      }
      if (bodyParts.length === 0) {
        res.status(400).send('Missing "body-parts" cookie');
        return;
      }

      if (!req.session?.slaveTask?.getRandomTask)
        _.set(req.session, 'slaveTask.getRandomTask', {});

      const filter = createFilter(bodyParts, equipment);

      const queryHash = hash(filter, FILTER_HASH_SALT);

      if (req.session.slaveTask.getRandomTask.queryHash === queryHash && req.session.slaveTask.getRandomTask.queryCount === 0) {
        res.status(400).send('No tasks match the equipment / body parts selected');
      } else {
        const [result] = await mongo('slave-training-tasks', async (collection) => {
          if (req.session.slaveTask.getRandomTask.queryHash !== queryHash) {
            req.session.slaveTask.getRandomTask.queryHash = queryHash;
            req.session.slaveTask.getRandomTask.queryCount = await collection.countDocuments(filter);
          }
          if (req.session.slaveTask.getRandomTask.queryCount === 0) {
            res.status(400).send('No tasks match the equipment / body parts selected');
            return [];
          }

          const taskNumber = random(0, req.session.slaveTask.getRandomTask.queryCount);

          return await collection.find(filter, { sort: { 'added': 1 }, limit: 1, skip: taskNumber }).toArray();
        });

        if (result) {
          res.status(200)
            .header('x-bdsmtools-slave-task-count', req.session.slaveTask.getRandomTask.queryCount)
            .json(result);

          await updateStats({ $inc: { [`randomTask.${undefined}`]: 1 } });
        }
      }
    },
    async getDailyTask () {
      if (equipment.length === 0) {
        res.status(400).send('Missing "equipment" cookie');
        return;
      }
      if (bodyParts.length === 0) {
        res.status(400).send('Missing "body-parts" cookie');
        return;
      }

      if (!req.session?.slaveTask?.getDailyTask)
        _.set(req.session, 'slaveTask.getDailyTask', {});

      const filter = createFilter(bodyParts, equipment);

      const queryHash = hash(filter, FILTER_HASH_SALT);
      const dateHash = hash(moment().utcOffset(Number(req.cookies.timezoneOffset || 0)).format('YYYY-MM-DD'));
      const etag = hash(queryHash, dateHash);

      res.set('ETag', etag);
      res.set('Cache-Control', 'no-cache'); // Use etag to verify usage of cache
      if (req.headers['If-None-Match'] === etag) {
        res.status(304).end();
      } else {

        if (req.session.slaveTask.getDailyTask.queryHash === queryHash && req.session.slaveTask.getDailyTask.queryCount === 0) {
          res.status(400).send('No tasks match the equipment / body parts selected');
        } else {
          const [result] = await mongo('slave-training-tasks', async (collection) => {
            if (req.session.slaveTask.getDailyTask.queryHash !== queryHash) {
              req.session.slaveTask.getDailyTask.queryHash = queryHash;
              req.session.slaveTask.getDailyTask.queryCount = await collection.countDocuments(filter);
            }
            if (req.session.slaveTask.getDailyTask.queryCount === 0) {
              res.status(400).send('No tasks match the equipment / body parts selected');
              return [];
            }

            const numberOfTasks = req.session.slaveTask.getDailyTask.queryCount;
            const taskNumber = parseInt(dateHash, 16) % numberOfTasks;

            return await collection.find(filter, { sort: { 'added': 1 }, limit: 1, skip: taskNumber }).toArray();
          });

          if (result) {
            res.status(200)
              .header('x-bdsmtools-slave-task-count', req.session.slaveTask.getDailyTask.queryCount)
              .json(result);

            await updateStats({ $inc: { dailyTask: 1 } });
          }
        }
      }
    }
  });
};

const getStats = async (req, res) => res.status(200).json({
  stats: req.session?.slaveTask?.stats || {
    points: 0,
    completedTasks: 0,
    failedTasks: 0,
    dailyStreak: 0,
  },
  completedTasks: (req.session?.slaveTask?.completedTasks ?? [])
    .filter(({ timestamp }) => moment(timestamp).isSame(moment(), 'day')),
  failedTasks: (req.session?.slaveTask?.failedTasks ?? [])
    .filter(({ timestamp }) => moment(timestamp).isSame(moment(), 'day')),
});

const getTask = async (req, res) => req.query.bodyPart
  ? await slaveTrainingTasks(req, res).getTask(req.query.bodyPart)
  : await slaveTrainingTasks(req, res).getRandomTask();

const getDailyTask = async (req, res) => await slaveTrainingTasks(req, res).getDailyTask();

const completeTask = (isCompleted) => async (req, res) => {
  const { id: taskId, bonus, daily } = req.query;

  if (!req.session?.slaveTask?.stats)
    _.set(req.session, 'slaveTask.stats', { points: 0, completedTasks: 0, failedTasks: 0, dailyStreak: 0 });

  if (!isCompleted) {
    if (!req.session?.slaveTask?.failedTasks)
      _.set(req.session, 'slaveTask.failedTasks', []);

    req.session.slaveTask.stats.points -= (100 * (daily === 'true' ? 5 : 1));
    req.session.slaveTask.stats.failedTasks++;
    req.session.slaveTask.failedTasks.push({
      taskId,
      timestamp: moment().toISOString(),
      daily,
    });

    await updateStats({ $inc: { taskFail: 1, [`tasks.fail.${taskId}`]: 1 } });
  } else {
    if (!req.session?.slaveTask?.completedTasks)
      _.set(req.session, 'slaveTask.completedTasks', []);

    const dailyTasks = req.session?.slaveTask?.completedTasks?.filter((task) => !!task.daily) || [];
    const mostRecentTaskCompleted = moment(dailyTasks[dailyTasks.length - 1].timestamp).startOf('day');
    if (mostRecentTaskCompleted.diff(moment().startOf('day'), 'days') === 1) {
      req.session.slaveTask.stats.dailyStreak++;

      await updateStats({ $max: { dailyStreakHighScore: req.session.slaveTask.stats.dailyStreak } });
    } else {
      req.session.slaveTask.stats.dailyStreak = 0;
    }

    req.session.slaveTask.stats.points += (100 * (bonus === 'true' ? 2 : 1) * (daily === 'true' ? 5 : 1));
    req.session.slaveTask.stats.completedTasks++;
    req.session.slaveTask.completedTasks.push({
      taskId,
      timestamp: moment().toISOString(),
      daily,
    });

    await updateStats({ $inc: { taskSuccess: 1, [`tasks.success.${taskId}`]: 1 } });
  }

  await getStats(req, res);
};

const app = express();
app.use(cors({
  credentials: true,
  methods: ['GET', 'POST'],
  origin: [
    /localhost/,
    /bdsmtools\.org/,
    /.bdsmtools\.org/
  ],
  exposedHeaders: ['x-bdsmtools-slave-task-count'],
  maxAge: 300,
}));
app.use(session({
  name: 'sessionID',
  store: new MongoDBStore({
    uri,
    databaseName: MONGO_DB,
    collection: 'user-sessions',
    expires: 5.184e+9, // ~60 days
  }),
  secret: [
    SESSION_KEY_V1
  ],
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'Lax',
    // secure: true,
    httpOnly: true,
    domain: SESSION_DOMAIN_OVERRIDE || '.bdsmtools.org',
  }
}));
app.use(cookieParser());
app.get('/stats', getStats);
app.get('/task', getTask);
app.get('/daily-task', getDailyTask);
app.post('/complete-task', requireSession(completeTask(true)));
app.post('/fail-task', requireSession(completeTask(false)));

module.exports = { app };
