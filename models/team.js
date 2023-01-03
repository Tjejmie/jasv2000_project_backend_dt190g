const mongoose = require('mongoose');

/** A mongoose Schema representing a team in the teams collection */
const teamsSchema = new mongoose.Schema({
    organisationNumber: {type: String, require: true, unique: true},
    teamName: { type: String, required: true},
    created: { type: Number, required: true },
    location: { type: String, required: true },
    arena: { type: String, required: false},
    division: { type: String, required: true},
    SMgolds: { type: Number, required: false},
    headCoach: { type: String, reqired: false}
});

/** Assign a function to the statics object of teamsSchema
 * Returns an array of mongoose Documents containing all teams that
 * exist in the teams collection */
teamsSchema.statics.getAllTeams = function () {
    return this.find({});
};

/** Assign a function to the statics object of teamsSchema
 * Returns a mongoose Document with the team matching the organisationNumber
 * or null if it does not exist */
teamsSchema.statics.getTeam = function (organisationNumber) {
    return this.findOne({organisationNumber : organisationNumber});
};

/** Assign a function to the statics object of teamsSchema
 * Delete the team with given organisationNumber if it exist */
teamsSchema.statics.deleteTeam = function (organisationNumber) {
    return this
        .findOneAndRemove({organisationNumber : organisationNumber});
};

/** Assign a function to the statics object of teamsSchema
 * Update the division of the team with the given organisationNumber if it exist */
teamsSchema.statics.updateTeam = function (organisationNumber, division) {
    return this
        .findOneAndUpdate({organisationNumber : organisationNumber}, division);
};

/** Export the Team model to be used in other places */
module.exports = mongoose.model('Team', teamsSchema);
