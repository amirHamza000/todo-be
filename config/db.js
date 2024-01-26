const mongoose = require("mongoose");


mongoose
	.connect(process.env.DB_URI, {
		dbName: process.env.DB_NAME
	})
	.then(() => {
		console.log("MongoDB connected");
	})
	.catch((error) => {
		console.error(error);
	});

mongoose.connection.on("connected", () => {
	console.log("Database connected");
});

mongoose.connection.on("error", (error) => {
	error.message = "Mongoose error: " + error.message;
	console.error(error);
});

mongoose.connection.on("disconnected", () => {
	console.log("Database disconnected");
});
