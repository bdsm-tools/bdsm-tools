const {
  MONGO_CLUSTER_PASSWORD,
  MONGO_CLUSTER_URI,
  MONGO_DB,
  SESSION_KEY_V1,
  SESSION_DOMAIN_OVERRIDE,
} = process.env;
if (
  !(MONGO_CLUSTER_PASSWORD && MONGO_CLUSTER_URI && MONGO_DB && SESSION_KEY_V1)
)
  throw new Error(
    'Missing environment variables. ' +
      `MONGO_CLUSTER_PASSWORD: ${!!MONGO_CLUSTER_PASSWORD}, ` +
      `MONGO_CLUSTER_URI: ${!!MONGO_CLUSTER_URI}, ` +
      `MONGO_DB: ${MONGO_DB}`,
  );

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session);
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://bdsmtools-gcf:${MONGO_CLUSTER_PASSWORD}@${MONGO_CLUSTER_URI}?retryWrites=true&w=majority&appName=bdsmtools-db`;

let mongoClient;
const client = async () => {
  if (!mongoClient) {
    mongoClient = await MongoClient.connect(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }
  return mongoClient;
};

async function mongo(collection, func) {
  return await func((await client()).db(MONGO_DB).collection(collection));
}

const getFlag = async (req, res) => {
  const { id } = req.params;

  const result = await mongo('feature-flags', (collection) =>
    collection.findOne({ _id: id }),
  );

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).send('No feature with that ID');
  }
};

const getEnabledFlags = async (req, res) => {
  const results = await mongo('feature-flags', async (collection) => {
    return await collection.find({}, { limit: 100 }).toArray();
  });

  res.status(200).json(results.map(({ _id }) => _id));
};

const app = express();
app.use(
  cors({
    methods: ['GET'],
    origin: [/localhost/, /bdsmtools\.org/, /.bdsmtools\.org/],
    maxAge: 300,
  }),
);
app.use(
  session({
    name: 'sessionID',
    store: new MongoDBStore({
      uri,
      databaseName: MONGO_DB,
      collection: 'user-sessions',
      expires: 5.184e9, // ~60 days
    }),
    secret: [SESSION_KEY_V1],
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: 'Lax',
      // secure: true,
      httpOnly: true,
      domain: SESSION_DOMAIN_OVERRIDE || '.bdsmtools.org',
    },
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Cache-Control', 'public, max-age=86400'); // 24 hours
  next();
});

app.get('/flag/:id', getFlag);

app.get('/flag/enabled', getEnabledFlags);

module.exports = { app };
