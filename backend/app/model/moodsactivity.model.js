module.exports = (sequelize, Sequelize) => {
	const Moodsactivity = sequelize.define('moodsactivity', {
	  mood: {
			type: Sequelize.STRING
	  },
	  activity: {
			type: Sequelize.STRING
	  },
		city: {
	  	    type: Sequelize.STRING
		},

		weathere:{
            type: Sequelize.STRING
		},
		tempe:
			{
			type: Sequelize.INTEGER
			}
		,

	});

	return Moodsactivity;
}
