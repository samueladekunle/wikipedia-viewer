const path = require("path");

// Source directory.
const src = path.resolve(__dirname, "src");

// Output directory.
const dist = path.resolve(__dirname, "dist/static/js");

// View.
const view = path.join(__dirname, "public");

// Assets.
const assets = path.join(__dirname, "dist");

// Export the config.
module.exports = {
	entry: path.join(src, "index.js"),
	output: {
		path: dist,
		filename: "main.js"
	},
	devServer: {
		contentBase: [view, assets],
		port: process.env.PORT || 9000
	}
};