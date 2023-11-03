const express = require('express');
const app = express();

const db  = require("./db");

module.exports = {

  initialize: (params) => {

    app.use(express.json());

    app.post('/insert', (req, res) => {
      const data = req.body;
      const result = db.insert(data);
      res.send(result);
    });

    app.get('/query', (req, res) => {
      const query = req.body;
      const result = db.query(query);
      res.send(result);
    });

    app.listen(params.port, () => {
      log.write(`HTTP API Listening At: ${params.port}`, -1);
    });
  },
};