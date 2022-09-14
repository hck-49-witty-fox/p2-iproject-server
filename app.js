const express = require('express');
const router = require('./routes');
const app = express();
const cors = require('cors');
const port = 3000 || process.env.port;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log('wopwop', port);
});
