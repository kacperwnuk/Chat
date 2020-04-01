const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");

const serverConfig = {
    target: "node",
    entry: {
        auth: "./src/backend/auth",
        session: "./src/backend/session",
        cdn: "./src/backend/cdn"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist/backend/"),
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: "ts-loader",
            exclude: /node_modules/,
        }]
    },
    resolve: {
        extensions: [".ts", ".json"],
    },
    externals: [nodeExternals()]
};

const clientConfig = {
    target: "web",
    entry: {
        main: "./src/frontend/index.jsx"
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist/public/")
    },
    module: {
        rules: [{
            test: /\.(ts|jsx)$/,
            use: "ts-loader",
            exclude: /node_modules/,
        }]
    },
    resolve: {
        extensions: [".ts", ".js", ".jsx", ".json"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "ChatRSO",
            filename: "index.html",
            chunks: ["main"],
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ]
};

module.exports = [serverConfig, clientConfig];