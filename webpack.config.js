const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // <-- Add this line

module.exports = {
    // Set the mode: 'development' for dev server, 'production' for optimized build
    mode: 'development', // Change to 'production' for optimized build

    // Entry point of our application
    entry: './src/index.js', // We'll create this file next

    // Output configuration
    output: {
        filename: 'bundle.js', // The name of the bundled JavaScript file
        path: path.resolve(__dirname, 'dist'), // Output directory (e.g., 'dist' folder)
        clean: true, // Clean the output directory before each build
    },

    // Module rules for different file types
    module: {
        rules: [
            // Rule for Sass/CSS files
            {
                test: /\.s[ac]ss$/i, // Matches .scss and .sass files
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            // Rule for regular CSS files
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            // Rule for images (handled by Webpack 5)
            // Note: This rule is good, but when using HtmlWebpackPlugin,
            // the path in HTML isn't processed by this loader automatically.
            // CopyWebpackPlugin is a more direct fix for this specific issue.
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext]' // Ensure images are in an 'img' folder in the output
                }
            },
            // Rule for handling font files
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
        ],
    },

    // Plugins for additional functionalities
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css', // Name of the extracted CSS file
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        // Add CopyWebpackPlugin here to copy your assets
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/img', // Source directory to copy from
                    to: 'img', // Destination directory relative to the output path
                },
            ],
        }),
    ],

    // Development server configuration
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
        open: true,
        hot: true,
    },
};
