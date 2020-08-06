const { exports } = require('./utils.js');

const withDb = (db, req, res) => {
  const sceneNegotiationTypes = db.collection("scene-negotiation-types");
  return ({
    async getAll() {
      const docs = await sceneNegotiationTypes
        .limit(100)
        .get()
        .then(extract);

      res.status(200).json(docs);
    }
  });
};

const extract = (querySnapshot) => querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

exports.withDb = withDb;
