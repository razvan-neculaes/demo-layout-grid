// webpack.config.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                    // In development, use 'style-loader' to inject CSS into the DOM.
                    // In production, use 'MiniCssExtractPlugin.loader' to extract CSS into a separate file.
                    MiniCssExtractPlugin.loader, // Use this for both dev and prod for external CSS
                    'css-loader', // Interprets @import and url()
                    'sass-loader', // Compiles Sass to CSS
                ],
            },
            // Rule for images (optional, but good practice if you have any in CSS)
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource', // Webpack 5 way to handle assets
            },
            // You can add rules for JavaScript here later if needed
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader', // If you use Babel for modern JS features
            //     },
            // },
        ],
    },

    // Plugins for additional functionalities
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css', // Name of the extracted CSS file
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html', // Path to your source HTML file
            filename: 'index.html', // Output HTML file name in 'dist'
            // You can add title, favicon etc. here
            // title: 'One Step Website',
        }),
    ],

    // Development server configuration (optional, but very useful)
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080, // You can change the port
        open: true, // Open the browser automatically
        hot: true, // Enable Hot Module Replacement
    },
};
