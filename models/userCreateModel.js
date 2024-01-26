const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const userCreateSChema = new Schema({
		first_name: {
			type: String,
			required: true,
		},
        last_name:{
            type: String,
			required: true,
        },

		email: {
			type: String,
			required: true
		},
        password:{
			type: String,
			required: true
		},
		status: {
			type: String,
            default:'active',
			enum: ["active", "inactive"],
		},

		date: {
			type: Date,
			default: Date.now
		},

	}, {
		timestamps: true,
		collection: "Users",
	}

);

const User = mongoose.model("User", userCreateSChema);

module.exports = User