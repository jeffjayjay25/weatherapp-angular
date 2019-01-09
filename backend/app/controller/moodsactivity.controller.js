const db = require('../config/db.config.js');
const 	MoodsActivity = db.moodsactivities;

// Post a MoodsActivity
exports.create = (req, res) => {
	// Save to MySQL database
	let moodsactivity = req.body;
	MoodsActivity.create(moodsactivity).then(result => {
		// Send created moods and activities to client
		res.json(result);
	});
};

// Fetch all moods and activities
exports.findAll = (req, res) => {
	MoodsActivity.findAll().then(moodsactivities => {
	  // Send all moods and activities to Client
	  res.json(moodsactivities);
	});
};

// Find a mood by Id
exports.findById = (req, res) => {
	MoodsActivity.findById(req.params.moodsactivityId).then(moodsactivity => {
		res.json(moodsactivity);
	})
};

// Update a MoodsActivity
exports.update = (req, res) => {
	let moodsactivity = req.body;
	let id = req.body.id;
	MoodsActivity.update(moodsactivity,
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"updated successfully a mood and activity with id = " + id});
				   });
};

// Delete a MoodsActivity by Id
exports.delete = (req, res) => {
	const id = req.params.moodsactivityId;
	MoodsActivity.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({msg:'deleted successfully a mood and activity with id = ' + id});
	});
};
