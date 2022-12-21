const mongoose = require('mongoose');

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

// Get all courses
teamsSchema.statics.getAllTeams = function () {
    return this.find({});
};

// Get specific team
teamsSchema.statics.getTeam = function (organisationNumber) {
    return this.findOne({organisationNumber : organisationNumber});
};




module.exports = mongoose.model('Team', teamsSchema);
