const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const categorySchema = new Schema({
		name: {
			type: String,
			required: true,
		},

		short_name: {
			type: String,
			required: true
		},
	
		description: String,

		date: {
			type: Date,
			default: Date.now
		},

	}, {
		timestamps: true,
		collection: "Category",
	}

);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category