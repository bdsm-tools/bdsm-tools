const extract = (querySnapshot) => querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

exports.extract = extract;