const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const db = require("./config/keys").mongoURI;

const app = express();
app.use(express.json());
app.use(cors());

mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Your Database is Connected"))
	.catch(err => console.log(err));

app.use("/", require("./routes/api/dogs"));

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
