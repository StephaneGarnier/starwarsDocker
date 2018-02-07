'use strict';

const express = require('express');
const swapi = require('swapi-node');

// Constants
const PORT = 8000;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

app.get('/', (req, res) => {
    swapi.getPerson(1).then((result) => {
        res.send(result);
    });
});

app.get('/search/people/:name', (req, res) => {
    swapi.get('http://swapi.co/api/people/?search=' + req.params.name).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

app.get('/search/films/:name', (req, res) => {
    swapi.get('http://swapi.co/api/films/?search=' + req.params.name).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

app.get('/search/planets/:name', (req, res) => {
    swapi.get('http://swapi.co/api/planets/?search=' + req.params.name).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

app.get('/search/starships/:name', (req, res) => {
    swapi.get('http://swapi.co/api/starships/?search=' + req.params.name).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);