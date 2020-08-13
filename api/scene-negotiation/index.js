const admin = require('firebase-admin');

admin.initializeApp(); // functions.config().firebase
const db = admin.firestore();

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.doProcess = async (req, res) => {
  console.log('Request:', req);

  try {
    res.set('Access-Control-Allow-Origin', '*');
    switch (req.method) {
      case 'OPTIONS':
        res.set('Access-Control-Allow-Methods', 'GET,POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
        return;
      case 'GET':
        return await doGet(req, res);
      case 'POST':
        return await doPost(req, res);
      default:
        res.status(400).send('Invalid method');
        return;
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

async function doGet(req, res) {
  const { path, query } = req;
  const { id } = query;

  if (path.startsWith('/negotiation-types')) {
    if (id) {
      return await sceneNegotiationTypes(req, res).getOne(id);
    } else {
      return await sceneNegotiationTypes(req, res).getAll();
    }
  }
  if (path.startsWith('/negotiation')) {
    if (id) {
      return await sceneNegotiation(req, res).getOne(id);
    }
  }

  res.status(404).send('No data found for resource');
}

async function doPost(req, res) {
  const { path, query, body } = req;
  const { id, active } = query;

  if (path.startsWith('/negotiation')) {
    if (!id) {
      if (req.get('content-type') === 'application/json') {
        return await sceneNegotiation(req, res).save(body);
      }
    }
  }

  if (path.startsWith('/negotiation-types/activate')) {
    return await sceneNegotiationTypes(req, res)
      .activate(id, (active || 'true') === 'true');
  }

  if (path.startsWith('/negotiation-types/delete')) {
    return await sceneNegotiationTypes(req, res).delete(id);
  }

  if (path.startsWith('/negotiation-types')) {
    return await sceneNegotiationTypes(req, res).save(body);
  }
}

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
      const ref = await this.getOne(id);
      await ref.update({
        active,
      });
      const template = await ref.get()
        .then(extract);

      res.status(200).json({ ...template, id: ref.id });
      return template;
    },
    async delete(id) {
      const ref = await this.getOne(id);
      if (!ref.active) {
        await collection.doc(id).delete();
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
  const mapper = (doc) => ({ id: doc.id, ...doc.data() });
  if (querySnapshot.data) {
    return querySnapshot.data();
  }
  if (querySnapshot.docs) {
    return querySnapshot.docs.map(mapper);
  }
  return querySnapshot;
}
