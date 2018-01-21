const express = require("express");
const path = require("path");

const app = express();

const dist = path.resolve(__dirname, "../dist");
const view = path.resolve(__dirname, "../public");

app.use(express.static(dist));
app.use(express.static(view));

app.set("port", process.env.PORT || 5000);

const server = app.listen(app.get("port"), () => {
	console.log(`Server listening on port ${server.address().port}`);
});

app.get("/", (req, res) => {
	res.sendFile("index.html");
});