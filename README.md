# Baseball Run Differentials

A project built using [D3.js](https://d3js.org/) for [Baseball Hack Day](http://www.baseballhackday.com/) 2018. It uses an Express server as a proxy to query the [MySportsFeeds API](https://www.mysportsfeeds.com/data-feeds/) for MLB game data.

Allows you to toggle between teams to view run differentials for each game played.

## Installation

To run, copy `.env.example` to `.env` and add your MySportsFeeds API username and password. Install dependencies by running `yarn` from the project root, and also from the `client` directory. From the root directory, run `npm start` to run both the Express server and front-end.

## Deployment

The project is set up to be deployed to Heroku via a [Heroku-specific build step](https://devcenter.heroku.com/articles/nodejs-support#heroku-specific-build-steps), which will take care of building assets for production after deployment.
