/** Include all needed dependencies */
const routes = require('express').Router();
const League = require('../models/league');

/** Get all leagues
 * Register a route handler function that Express will call when it recieves an
 * GET request to /api/leagues */
routes.get("/api/leagues", async (req, res) => {
	League.getAllLeagues()
        .then(league => res.status(200).json(league[0].leagues));
})

module.exports = routes;