const express = require('express');
const next = require('next');
const compression = require('compression');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use(compression());

    server.get('/login', (req, res) => {
      const actualPage = '/LoginPage';
      app.render(req, res, actualPage);
    });

    server.get('/home', (req, res) => {
        const actualPage = '/HomePage';
        app.render(req, res, actualPage);
      });

    server.get('/thankYou', (req, res) => {
        const actualPage = '/ThankYou';
        app.render(req, res, actualPage);
      });  

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) {
        throw err;
      }
      console.log('Ready on http://localhost:3000');
    });
  })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  });