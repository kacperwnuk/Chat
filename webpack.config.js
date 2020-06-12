const path = require("path");

const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const serverConfig = {
    target: "node",
    entry: {
        auth: "./src/backend/auth",
        session: "./src/backend/session",
        cdn: "./src/backend/cdn",
        adm: "./src/backend/adm"
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
        main: "./src/frontend/index.tsx"
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist/public/")
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            use: "ts-loader",
            exclude: /node_modules/,
        }]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    node: {
        fs: "empty"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "ChatRSO",
            filename: "index.html",
            chunks: ["main"],
        }),
        new webpack.EnvironmentPlugin([
            "RSO_ENV", "RSO_CDN", "RSO_SESSION", "RSO_AUTH"
        ])
    ]
};

module.exports = [clientConfig, serverConfig];