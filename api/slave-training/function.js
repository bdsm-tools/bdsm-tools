const { MONGO_CLUSTER_PASSWORD, MONGO_CLUSTER_URI, MONGO_DB, SESSION_KEY_V1 } = process.env;
if (!(MONGO_CLUSTER_PASSWORD && MONGO_CLUSTER_URI && MONGO_DB && SESSION_KEY_V1))
  throw 'Missing environment variables. '
  + `SESSION_KEY_V1: ${!!SESSION_KEY_V1}, `
  + `MONGO_CLUSTER_PASSWORD: ${!!MONGO_CLUSTER_PASSWORD}, `
  + `MONGO_CLUSTER_URI: ${!!MONGO_CLUSTER_URI}, `
  + `MONGO_DB: ${MONGO_DB}`;

const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const crypto = require('crypto');
const moment = require('moment');

const hash = (...data) => crypto.createHash('md5').update(data.map((d) => JSON.stringify(d)).join('')).digest('hex');

const random = (min, max) => Math.round(Math.random() * (max - min) + min);

const uri = `mongodb+srv://bdsmtools-gcf:${MONGO_CLUSTER_PASSWORD}@${MONGO_CLUSTER_URI}?retryWrites=true&w=majority&appName=bdsmtools-db`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

async function mongo(collection, func) {
  try {
    await client.connect();
    return await func(client.db(MONGO_DB).collection(collection));
  } finally {
    await client.close();
  }
}

const cors = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Max-Age', '3600');
  res.status(204).send('');
};

const slaveTrainingTasks = (req, res) => {
  console.log('Cookies: ', req.cookies);

  const equipment = req.cookies['my-equipment']?.split('|') ?? [];
  const bodyParts = req.cookies['body-parts']?.split('|') ?? [];

  return ({
    async getTask (bodyPart) {
      if (!bodyPart) {
        res.status(400).send('Missing parameter');
        return;
      }
      if (equipment.length === 0) {
        res.status(400).send('Missing equipment cookie');
        return;
      }

      const filter = {
        'requiresBodyPart': { '$in': [bodyPart] },
        'requiresEquipment': { '$in': equipment }
      };

      const queryHash = hash(filter, 'v1');

      if (req.session.slaveTask?.getTask?.queryHash === queryHash && req.session.slaveTask?.getTask?.queryCount === 0) {
        res.status(400).send('No tasks match the equipment / body parts selected');
      } else {
        const [result] = await mongo('slave-training-tasks', async (collection) => {
          if (req.session.slaveTask?.getTask?.queryHash !== queryHash) {
            req.session.slaveTask?.getTask?.queryHash = queryHash;
            req.session.slaveTask?.getTask?.queryCount = await collection.countDocuments(filter);
          }
          if (req.session.slaveTask?.getTask?.queryCount === 0) {
            res.status(400).send('No tasks match the equipment / body parts selected');
            return [];
          }

          const taskNumber = random(0, req.session.slaveTask?.getTask?.queryCount);

          return await collection.find(filter, { sort: { 'added': 1 }, limit: 1, skip: taskNumber }).toArray();
        });

        if (result) {
          res.status(200).json(result);
        }
      }
    },
    async getRandomTask () {
      if (equipment.length === 0) {
        res.status(400).send('Missing equipment cookie');
        return;
      }
      if (bodyParts.length === 0) {
        res.status(400).send('Missing bodyParts cookie');
        return;
      }

      const filter = {
        'requiresBodyPart': { '$in': bodyParts },
        'requiresEquipment': { '$in': equipment }
      };

      const queryHash = hash(filter, 'v1');

      if (req.session.slaveTask?.getRandomTask?.queryHash === queryHash && req.session.slaveTask?.getRandomTask?.queryCount === 0) {
        res.status(400).send('No tasks match the equipment / body parts selected');
      } else {
        const [result] = await mongo('slave-training-tasks', async (collection) => {
          if (req.session.slaveTask?.getRandomTask?.queryHash !== queryHash) {
            req.session.slaveTask?.getRandomTask?.queryHash = queryHash;
            req.session.slaveTask?.getRandomTask?.queryCount = await collection.countDocuments(filter);
          }
          if (req.session.slaveTask?.getRandomTask?.queryCount === 0) {
            res.status(400).send('No tasks match the equipment / body parts selected');
            return [];
          }

          const taskNumber = random(0, req.session.slaveTask?.getRandomTask?.queryCount);

          return await collection.find(filter, { sort: { 'added': 1 }, limit: 1, skip: taskNumber }).toArray();
        });

        if (result) {
          res.status(200).json(result);
        }
      }
    },
    async getDailyTask () {
      if (equipment.length === 0) {
        res.status(400).send('Missing equipment cookie');
        return;
      }
      if (bodyParts.length === 0) {
        res.status(400).send('Missing bodyParts cookie');
        return;
      }

      const filter = {
        'requiresBodyPart': { '$in': bodyParts },
        'requiresEquipment': { '$in': equipment }
      };

      const queryHash = hash(filter, 'v1');
      const startOfTomorrow = moment().utcOffset(Number(req.cookies.timezoneOffset || 0)).endOf('day').add(1, 'second');

      res.set('Expires', startOfTomorrow.toUTCString());
      res.set('ETag', queryHash);
      if (req.headers['if-none-match'] === queryHash) {
        res.status(304).end();
      } else {

        if (req.session.slaveTask?.getDailyTask?.queryHash === queryHash && req.session.slaveTask?.getDailyTask?.queryCount === 0) {
          res.status(400).send('No tasks match the equipment / body parts selected');
        } else {
          const [result] = await mongo('slave-training-tasks', async (collection) => {
            if (req.session.slaveTask?.getDailyTask?.queryHash !== queryHash) {
              req.session.slaveTask?.getDailyTask?.queryHash = queryHash;
              req.session.slaveTask?.getDailyTask?.queryCount = await collection.countDocuments(filter);
            }
            if (req.session.slaveTask?.getDailyTask?.queryCount === 0) {
              res.status(400).send('No tasks match the equipment / body parts selected');
              return [];
            }

            const dateHash = hash(moment().utcOffset(Number(req.cookies.timezoneOffset || 0)).format('YYYY-MM-DD'));
            const numberOfTasks = req.session.slaveTask?.getDailyTask?.queryCount;
            const taskNumber = parseInt(dateHash, 16) % numberOfTasks;

            return await collection.find(filter, { sort: { 'added': 1 }, limit: 1, skip: taskNumber }).toArray();
          });

          if (result) {
            res.status(200).json(result);
          }
        }
      }
    }
  });
};

const getTask = async (req, res) => req.query.bodyPart
  ? await slaveTrainingTasks(req, res).getTask(req.query.bodyPart)
  : await slaveTrainingTasks(req, res).getRandomTask();

const getDailyTask = async (req, res) => await slaveTrainingTasks(req, res).getDailyTask();

const app = express();
app.use(cookieParser());
app.use(session({
  store: new MongoDBStore({
    uri,
    databaseName: MONGO_DB,
    collection: 'user-sessions'
  }),
  secret: [
    SESSION_KEY_V1
  ],
  resave: false,
  saveUninitialized: true
}));
app.options('/', cors);
app.get('/task', getTask);
app.get('/daily-task', getDailyTask);

module.exports = { app };