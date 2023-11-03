const mongo = require('mongodb').MongoClient;

const mongoUrl  = 'mongodb://localhost:27017/';
let db          = null;
let collections = null;

module.exports = {

  initialize: async (params) => {
    try {

      /* Connect To Database & Initialize Properties */
      const client = await mongo.connect(mongoUrl + params.endpoint);
      log.write('Connected To Database', -1);

      db = client.db(params.alias);
      collections = params.collections;

    } catch (error) {
      log.write(`Error: ${error}`, 3);
    };
  },

  query: async () => {

  },

  insert: async (data) => {
    try {

      /* Create Collection Handle */
      let collHdl = db.collection(collections.primary.alias);

      for (let property in data) {
        log.write(property, 5);
      };

    } catch (error) {
      log.write(`Error: ${error}`, 3);
    };
  }

};