/** Include all needed dependencies */
const routes = require('express').Router();
const Player = require('../models/player');

/** Get all players
 * Register a route handler function that Express will call when it recieves an
 * GET request to /api/players */
routes.get('/api/players', function (req, res) {
    Player.getAllPlayers()
        .then(players => res.status(200).json(players));
});

/** Get a specific player
 * Register a route handler function that Express will call when it recieves an
 * GET request to /api/players/:playerId. Return {} if playerId does not exist */
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

/** Delete specific player
 * Register a route handler function that Express will call when it recieves an
 * DELETE request to /api/players/:playerId. */
routes.delete('/api/players/:playerId', async function (req, res) { 
    const playerId = req.params.playerId;
    const errorResponse = `Not possible to delete player: ${playerId}`;

    Player.getPlayer(playerId).then(async player => {
        if (player?.playerId) {
            // Save player information to show
            // when player is deleted
            const savePlayerInfo = player;
            await Player.deletePlayer(playerId)
            res.status(200).json(savePlayerInfo);
        }
        else {
            res.status(404).json({ error: errorResponse })
        }
    })
});

/** Add a player
 * Register a route handler function that Express will call when it recieves an
 * POST request to /api/players */
routes.post('/api/players', async function (req, res) {
    const players = await Player.getAllPlayers();
    var isAlreadyAPlayer = false;

    const newPlayer = new Player({
        name: req.body.name,
        teamName: req.body.teamName,
        position: req.body.position,
        number: req.body.number,
        born: req.body.born,
        birthplace: req.body.birthplace,
        length: req.body.length,
        weight: req.body.weight,
        shoots: req.body.shoots,
        playerId: req.body.playerId,
        youthTeam: req.body.youthTeam,
        contract: req.body.contract
    });

    // Check if playerId already exist
    for(let i = 0; i < players.length; i++){
        if(newPlayer.playerId == players[i].playerId){
            isAlreadyAPlayer = true;
        }
    }

    if (isAlreadyAPlayer != true) {
        await newPlayer.save();
        res.status(200).json(newPlayer);
    }
    else{
        res.status(409).send({"error": "Player already exist"});                   
    }
});


/** Update player
 * Register a route handler function that Express will call when it recieves an
 * PUT request to /api/players/:playerId */
routes.put('/api/players/:playerId', async function (req, res) { 
    const playerId = req.params.playerId;
    const errorResponse = `Not possible to update player: ${playerId}`;

    // For easier handling, create an object with user data to be update
    const userDataToUpdate = {
        teamName: req.body.teamName,
    };

    // Get specific player thats going to be updated
    Player.getPlayer(playerId).then(async player => {
        if (player?.playerId) {
            //Update team
            await Player.updatePlayer(playerId, userDataToUpdate)
            //Get team again to get new data
            Player.getPlayer(playerId).then(async player => {
                res.status(200).json(player);
            })
        }
        else {
            res.status(404).json({ error: errorResponse })
        }
    })
});

module.exports = routes;