const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const PATHS = require("./paths");

module.exports = {
	entry: "./index.js",
	watch: true,
	output: {
		filename: "[name].[hash].js",
		path: path.resolve(PATHS.DIST),
		publicPath: "/",
	},
	resolve: {
		extensions: [".js"],
		alias: {
			assets: path.resolve(PATHS.ASSETS),
			src: path.resolve(PATHS.SRC),
		},
	},
	module: {
		rules: [
			{
				test: /\.(?:js|mjs|cjs)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [["@babel/preset-env", { targets: "defaults" }]],
					},
				},
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: { sourceMap: true },
					},
					"sass-loader",
				],
			},
			{
				test: /\.scss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|jpg?e|gif)$/i,
				loader: "file-loader",
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[hash].css",
		}),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: path.join(PATHS.PUBLIC, "index.html"),
		}),
	],
};
