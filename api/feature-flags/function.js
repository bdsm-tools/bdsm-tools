const admin = require('firebase-admin');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

admin.initializeApp(); // functions.config().firebase
const db = admin.firestore();

app.use((req, res, next) => {
  console.log(
    `Request: ${req.method} ${req.url}  -  ${JSON.stringify(req.headers)}`,
  );
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Cache-Control', 'public, max-age=86400');

  next();
});

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', ['Content-Type', 'Cache-Control']);
  res.header('Access-Control-Max-Age', '3600');
  res.status(204).send('');
});

app.get('/flag/:id', async (req, res) => {
  const { id } = req.params;

  const collection = await db.collection('feature-flags');
  const document = await collection.doc(id).get();
  if (document.exists) {
    res.status(200).json(document.data());
  } else {
    res.status(404).send('No feature with that ID');
  }
});

app.get('/flag/enabled', async (req, res) => {
  const collection = await db.collection('feature-flags');
  const documents = await collection
    .limit(100)
    .where('enabled', '==', true)
    .get().docs;
  const result = documents.map((doc) => doc.id);

  res.status(200).json(result);
});

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.doProcess = app;
