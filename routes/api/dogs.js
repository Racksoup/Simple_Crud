const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");

const Dog = require("../../models/Dog");
mongoose.set("useFindAndModify", false);

router.get("/", (req, res) => {
	Dog.find().then(dogs => res.json(dogs));
});

router.get("/:id", (req, res) => {
	Dog.findById(req.params.id).then(dog => res.json(dog));
});

router.post("/", auth, (req, res) => {
	const newDog = new Dog({
		name: req.body.name,
		breed: req.body.breed
	});
	newDog.save().then(dog => res.json(dog));
});

router.put("/:id", auth, (req, res) => {
	Dog.findByIdAndUpdate(req.params.id, {
		name: req.body.name,
		breed: req.body.breed
	}).then(dog => {
		res.json(dog);
	});
});

router.delete("/:id", auth, (req, res) => {
	Dog.findById(req.params.id).then(dog =>
		dog.remove().then(() => res.json({ success: true }))
	);
});

module.exports = router;
