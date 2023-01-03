/** Include all needed dependencies */
const routes = require('express').Router();
const Team = require('../models/team');
const Player = require('../models/player');

/** Get all teams
 * Register a route handler function that Express will call when it recieves an
 * GET request to /api/teams */
routes.get('/api/teams', function (req, res) {
    Team.getAllTeams()
        .then(teams => res.status(200).json(teams));
});

/** Get a specific team
 * Register a route handler function that Express will call when it recieves an
 * GET request to /api/teams/:organisationNumber. Return {} if organisationNumber does not exist */
routes.get('/api/teams/:organisationNumber', function (req, res) {
    const organisationNumber = req.params.organisationNumber;
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

/** Get all players of a team
 * Register a route handler function that Express will call when it recieves an
 * GET request to /api/teams/players/:organisationNumber
 * Return all players or {} if no players of that team exists */
routes.get('/api/teams/players/:organisationNumber', async function (req, res) {
    const organisationNumber = req.params.organisationNumber;
    const teams = await Team.getAllTeams();
    const players = await Player.getAllPlayers();
    let teamName;
    const playerOfTeam = [];
    //get team name
    for(let i = 0; i< teams.length; i++){
        if(teams[i].organisationNumber == organisationNumber){
            teamName = teams[i].teamName;
        }
    }
    //get all players that have same teamname and add to array
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

/** Delete specific team and all its players
 * Register a route handler function that Express will call when it recieves an
 * DELETE request to /api/teams/:organisationNumber. */
routes.delete('/api/teams/:organisationNumber', async function (req, res) { 
    const organisationNumber = req.params.organisationNumber;
    const errorResponse = `Not possible to delete team: ${organisationNumber}`;
    const players = await Player.getAllPlayers();
    Team.getTeam(organisationNumber).then(async team => {
        if (team?.organisationNumber) {

            // See if players for that team exist and delete them
            for(let i = 0; i< players.length; i++){
                if(players[i].organisationNumber == team.organisationNumber){
                    await Player.deletePlayer(players[i].playerId)
                }
            }
   
            // Delete team
            await Team.deleteTeam(organisationNumber)
            res.status(200).json(team);
        }
        else {
            res.status(404).json({ error: errorResponse })
        }
    })
});

/** Update team
 * Register a route handler function that Express will call when it recieves an
 * PUT request to /api/teams/:organisationNumber */
routes.put('/api/teams/:organisationNumber', async function (req, res) { 
    const organisationNumber = req.params.organisationNumber;
    const errorResponse = `Not possible to update team: ${organisationNumber}`;

    // For easier handling, create an object with user data to be update
    const userDataToUpdate = {
        division: req.body.division,
    };
    // Get specific team thats going to be updated
    Team.getTeam(organisationNumber).then(async team => {
        if (team?.organisationNumber) {
            //Update team
            await Team.updateTeam(organisationNumber, userDataToUpdate)
            //Get team again to get new data
            Team.getTeam(organisationNumber).then(async team => {
                res.status(200).json(team);
            })
        }
        else {
            res.status(404).json({ error: errorResponse })
        }
    })
});

/** Add a team
 * Register a route handler function that Express will call when it recieves an
 * POST request to /api/teams */
routes.post('/api/teams', async function (req, res) {
    const teams = await Team.getAllTeams();
    var isAlreadyATeam = false;

    const newTeam = new Team({
        teamName: req.body.teamName,
        created: req.body.created,
        location: req.body.location,
        arena: req.body.arena,
        organisationNumber: req.body.organisationNumber,
        headCoach: req.body.headCoach,
        division: req.body.division,
        SMgolds: req.body.SMgolds
    });
    // Check if teamName already exists
    for(let i = 0; i < teams.length; i++){
        if(newTeam.teamName == teams[i].teamName){
            isAlreadyATeam = true;
        }
    }
    if (isAlreadyATeam != true) {
        await newTeam.save();
        res.status(200).json(newTeam);
    }
    else{
        res.status(409).send({"error": "Team already exist"});                   
    }
});

module.exports = routes;