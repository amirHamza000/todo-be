const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const toDoCreateSchema = new Schema({
		title: {
			type: String,
			required: true,
		},

		category: {
			type: String,
			required: true
		},
		status: {
			type: String,
			required: true,
			enum: ["active", "inactive"],
		},
		description: String,

		date: {
			type: Date,
			
			default: Date.now
		},

	}, {
		timestamps: true,
		collection: "toDo",
	}

);

const ToDo = mongoose.model("ToDo", toDoCreateSchema);

module.exports = ToDo