const mongoose = require('mongoose');

const playersSchema = new mongoose.Schema({
    playerId: { type: String, required: true, unique: true},
    name: { type: String, required: true },
    teamName: { type: String, required: true},
    position: { type: String, required: true },
    number: { type: Number, required: true},
    born: { type: String, required: false},
    birthplace: { type: String, required: true},
    length: { type: Number, required: false},
    weight: { type: Number, required: false},
    shooter: { type: String, required: false},
    youthTeam: {type: String, required: false},
    contract: { type: String, required: false}

});


// Get all players
playersSchema.statics.getAllPlayers = function () {
    return this.find({});
};

// Get specific player
playersSchema.statics.getPlayer = function (playerId) {
    return this.findOne({playerId : playerId});
};

// Delete a player
playersSchema.statics.deletePlayer = function (playerId) {
    return this
        .findOneAndRemove({playerId : playerId});
};

// Update a player
playersSchema.statics.updatePlayer = function (playerId, teamName) {
    return this
        .findOneAndUpdate({playerId : playerId}, teamName);
};




module.exports = mongoose.model('Player', playersSchema);
