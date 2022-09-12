const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const cors = require('cors');
const port = 3000 || process.env.port;

app.use(express.static(path.join(__dirname, 'public')));

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.listen(port, () => {
  console.log('wopwop', port);
});
