const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3001);

require('dotenv').config();
const btoa = require('btoa');

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const fetch = require('node-fetch');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

app.get('/api/overall_team_standings/:season', (req, res) => {
  fetch(
    `https://api.mysportsfeeds.com/v1.2/pull/mlb/${
      req.params.season
    }-regular/overall_team_standings.json?teamstats=none&sort=team.abbr`,
    {
      method: 'get',
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    },
  )
    .then(response => response.json())
    .then(json => res.json(json));
});

app.get('/api/seasons/:season/:team', (req, res) => {
  fetch(
    `https://api.mysportsfeeds.com/v1.2/pull/mlb/${
      req.params.season
    }-regular/team_gamelogs.json?team=${
      req.params.team
    }&teamstats=W,L,RF,RA,RunDiff`,
    {
      method: 'get',
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    },
  )
    .then(response => response.json())
    .then(json => res.json(json));
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
