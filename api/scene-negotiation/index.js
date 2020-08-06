const admin = require('firebase-admin');
const sceneNegotiationTypes = require('./scene-negotiation-types.js');

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



  if (id) {

  } else {
    await sceneNegotiationTypes.withDb(db, req, res).getAll();
  }
}

async function doPost(req, res) {
  const { path, query } = req;
  const { id } = query;
}
