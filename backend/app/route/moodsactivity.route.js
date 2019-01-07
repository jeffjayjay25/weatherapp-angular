module.exports = function(app) {

    const moodsactivities = require('../controller/moodsactivity.controller.js');

    // Create a new mood and activity
    app.post('/api/moodsactivities', moodsactivities.create);

    // Retrieve all moods and activities
    app.get('/api/moodsactivities', moodsactivities.findAll);

    // Retrieve a single set of moods and activities by Id
    app.get('/api/moodsactivities/:moodsactivityId', moodsactivities.findById);

    // Update a mood and activity with Id
    app.put('/api/moodsactivities', moodsactivities.update);

    // Delete a mood and activity with Id
    app.delete('/api/moodsactivities/:moodsactivityId', moodsactivities.delete);
}
