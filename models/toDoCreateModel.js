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
			default:'pending',
			enum: ["pending", "active", "done"],
		},
		description: String,

		date: {
			type: Date,

			default: Date.now
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User"
		}

	}, {
		timestamps: true,
	}

);

const ToDo = mongoose.model("ToDo", toDoCreateSchema);

module.exports = ToDo