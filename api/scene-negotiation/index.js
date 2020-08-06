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
  const { path, query } = req;
  const { id } = query;
}

const sceneNegotiationTypes = (req, res) => {
  const collection = db.collection("scene-negotiation-types");
  return ({
    async getAll() {
      const docs = await collection
        .limit(100)
        .get()
        .then(extract);

      res.status(200).json(docs);
    },
    async getOne(id) {
      const doc = await collection
        .doc(id)
        .get()
        .then(extract);

      res.status(200).json(doc);
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
    },
    async save(body) {
      const negotiation = await collection.doc()
        .set(JSON.parse(body))
        .then(extract);

      res.status(200).json(negotiation);
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
