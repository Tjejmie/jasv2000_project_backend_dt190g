const mongoose = require('mongoose');

/** A mongoose Schema representing all leagues in the league collection.
 * League collections contains an array with all different leagues that exist. */
var leagueSchema = new mongoose.Schema({
    leagues : { type: [String], required: true},
});

/** Assign a function to the statics obejct of our leagueSchema
 * Returns an array of mongoose Documents containing all leagues that 
 * exist in the league collection */
leagueSchema.statics.getAllLeagues = function () {
    return this.find({});
};

/** Export the League model to be used in other places */
module.exports = mongoose.model('League', leagueSchema);
