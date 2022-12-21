const routes = require('express').Router();
const Team = require('../models/team');
const Player = require('../models/player');

// Get all teams
routes.get('/api/teams', function (req, res) {
    Team.getAllTeams()
        .then(teams => res.status(200).json(teams));
});

// Get specific team, return {} if it doesn't exist
routes.get('/api/teams/:organisationNumber', function (req, res) {
    const organisationNumber = req.params.organisationNumber.toLowerCase();
    Team.getTeam(organisationNumber)
        .then(team => {
            if (team?.organisationNumber) {
                res.status(200).json(team);
            }
            else {
                
                res.status(200).json({});
            }
        })
});

// Get all players of a team
routes.get('/api/teams/players/:teamName', async function (req, res) {
    const teamName = req.params.teamName.toTitle();
    const players = await Player.getAllPlayers();
    const playerOfTeam = [];
    for(let i = 0; i< players.length; i++){
        if(players[i].teamName == teamName){
            playerOfTeam.push(players[i]);
        }
    }
    if (playerOfTeam.length) {
        res.status(200).json(playerOfTeam);
    }
    else {
        
        res.status(200).json({});
    }
   
   
});

/** Function to call to change a string to title case,
 * it matches only the first letter of each word and capitalise it. */
String.prototype.toTitle = function() {
    return this.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
}


module.exports = routes;