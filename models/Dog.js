const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DogSchema = new Schema({
	name: { type: String },
	breed: { type: String }
});

module.exports = Dog = mongoose.model("dog", DogSchema);
