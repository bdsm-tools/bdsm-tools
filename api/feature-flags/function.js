const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp(); // functions.config().firebase
const db = admin.firestore();

const app = express();
app.use(cors({
  methods: ['GET', 'POST'],
  origin: [
    /localhost/,
    /bdsmtools\.org/,
    /.bdsmtools\.org/,
  ],
  maxAge: 300,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Cache-Control', 'public, max-age=86400');
  next();
});

app.get('/flag/:id', async (req, res) => {
  const { id } = req.params;

  const collection = await db.collection('feature-flags');
  const document = await collection.doc(id).get();
  if (document.exists) {
    res.status(200).json(document.data());
  } else {
    res.status(404).send("No feature with that ID");
  }
});

app.get('/flag/enabled', async (req, res) => {
  const collection = await db.collection('feature-flags');
  const documents = await collection.limit(100).where('enabled', '==', true).get().docs;
  const result = documents.map((doc) => doc.id);

  res.status(200).json(result);
});

module.exports = { app };
