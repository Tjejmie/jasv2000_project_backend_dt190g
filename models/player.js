const mongoose = require('mongoose');

/** A mongoose Schema representing a player in the players collection */
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
    shoots: { type: String, required: false},
    youthTeam: {type: String, required: false},
    contract: { type: String, required: false}

});

/** Assign a function to the statics object of playersSchema
 * Returns an array of mongoose Documents containing all players that
 * exist in the players collection */
playersSchema.statics.getAllPlayers = function () {
    return this.find({});
};

/** Assign a function to the statics object of playersSchema
 * Returns a mongoose Document with the player matching the playerId
 * or null if it does not exist */
playersSchema.statics.getPlayer = function (playerId) {
    return this.findOne({playerId : playerId});
};

/** Assign a function to the statics object of playersSchema
 * Delete the player with given playerId if it exist */
playersSchema.statics.deletePlayer = function (playerId) {
    return this
        .findOneAndRemove({playerId : playerId});
};

/** Assign a function to the statics object of playersSchema
 * Update the teamName of the player with the given playerId if it exist */
playersSchema.statics.updatePlayer = function (playerId, teamName) {
    return this
        .findOneAndUpdate({playerId : playerId}, teamName);
};

/** Export the Player model to be used in other places */
module.exports = mongoose.model('Player', playersSchema);
