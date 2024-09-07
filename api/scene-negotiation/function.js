const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

admin.initializeApp(); // functions.config().firebase
const db = admin.firestore();

const sceneNegotiationTypes = (req, res) => {
  const collection = db.collection("scene-negotiation-types");
  return ({
    async getAll(all) {
      let query = collection.limit(100);
      if (!all) {
        query = query.where('active', '==', true);
      }

      const docs = await query
        .get()
        .then(extract);

      res.status(200).json(docs);
      return docs;
    },
    async getOne(id) {
      const doc = await collection
        .doc(id)
        .get()
        .then(extract);

      res.status(200).json(doc);
      return doc;
    },
    async save(body) {
      const ref = await collection.add({
        ...body,
        active: false,
      });
      const template = await ref.get()
        .then(extract);

      res.status(200).json({ ...template, id: ref.id });
      return template;
    },
    async activate(id, active) {
      const ref = await collection.doc(id);
      await ref.update({
        active,
      });
      const template = await ref.get()
        .then(extract);

      res.status(200).json({ ...template, id: ref.id });
      return template;
    },
    async delete(id) {
      const ref = await collection.doc(id);
      const doc = ref.get()
        .then(extract);

      if (!doc.active) {
        await ref.delete();
        res.status(200);
      } else {
        res.status(400).sendMessage('Template is active');
      }
    }
  });
};

const sceneNegotiation = (req, res) => {
  const collection = db.collection("scene-negotiations");
  return ({
    async getOne(id) {
      const doc = await collection
        .doc(id)
        .get()
        .then(extract);

      res.status(200).json(doc);
      return doc;
    },
    async save(body) {
      const ref = await collection.add({
          ...body,
          when: new Date(),
        });
      const negotiation = await ref.get()
        .then(extract);

      res.status(200).json({ ...negotiation, id: ref.id });
      return negotiation;
    }
  });
};

const extract = (querySnapshot) => {
  if (querySnapshot.docs) {
    return querySnapshot.docs.map(extract);
  }

  if (querySnapshot.data) {
    return ({
      id: querySnapshot.id,
      ...querySnapshot.data()
    });
  }
  return querySnapshot;
};

const getNegotiationTypes = async (req, res) => {
  const { id, all } = req.query;
  if (id) {
    return await sceneNegotiationTypes(req, res).getOne(id);
  } else {
    return await sceneNegotiationTypes(req, res).getAll(all === 'true');
  }
};

const getNegotiation = async (req, res) => {
  const { id, all } = req.query;
  if (id) {
    return await sceneNegotiation(req, res).getOne(id);
  }

  res.status(404).send('No data found for resource');
};

const activateNegotiationType = async (req, res) => {
  const { id, active } = req.query;

  return await sceneNegotiationTypes(req, res)
    .activate(id, (active || 'true') === 'true');
};

const deleteNegotiationType = async (req, res) => {
  const { id } = req.query;

  return await sceneNegotiationTypes(req, res).delete(id);
};

const saveNegotiationType = async (req, res) => {
  if (req.get('Content-Type') === 'application/json') {
    return await sceneNegotiationTypes(req, res).save(req.body);
  }
};

const saveNegotiation = async (req, res) => {
  const { query, body } = req;
  const { id } = query;

  if (!id) {
    if (req.get('Content-Type') === 'application/json') {
      return await sceneNegotiation(req, res).save(body);
    }
  }
};

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
app.get('/negotiation-types', getNegotiationTypes);
app.get('/negotiation', getNegotiation);
app.post('/negotiation', saveNegotiation);
app.post('/negotiation-types', saveNegotiationType);
app.post('/negotiation-types/activate', activateNegotiationType);
app.post('/negotiation-types/delete', deleteNegotiationType);

module.exports = { app };
