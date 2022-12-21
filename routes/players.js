const routes = require('express').Router();
const Player = require('../models/player');

// Get all players
routes.get('/api/players', function (req, res) {
    Player.getAllPlayers()
        .then(players => res.status(200).json(players));
});

// Get specific player, return {} if it doesn't exist
routes.get('/api/players/:playerId', function (req, res) {
    const playerId = req.params.playerId.toLowerCase();
    Player.getPlayer(playerId)
        .then(player => {
            if (player?.playerId) {
                res.status(200).json(player);
            }
            else {
                
                res.status(200).json({});
            }
        })
});






module.exports = routes;