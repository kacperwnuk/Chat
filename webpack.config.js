const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main: "./src/frontend/index.jsx"
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist/public/")
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    useBuiltIns: "entry",
                                    corejs: 3,
                                    targets: {
                                        chrome: "80"
                                    }
                                }
                            ],
                            "@babel/preset-react"
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"],
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