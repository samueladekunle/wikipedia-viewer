const path = require("path");

module.exports = {
	entry: path.join(path.resolve(__dirname, "scripts"), "index.js"),
	output: {
		path: path.resolve(__dirname, "."),
		filename: "bundle.js"
	},
	devServer: {
		port: process.env.PORT || 9000
	}
};