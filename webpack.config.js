const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.jsx',
    devServer: {
        static: './dist',
        port: 3000,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output managment',
            template: './src/index.html',
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true,
    },
    resolve: {
        extensions: ['.jpg','.png','.jsx','.tsx', '.ts', '.js', '.ttf', '.mp4'],
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/i,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/i,
                use: ['html-loader'],
            },
            {
                test: /\.mp4$/i,
                use: 'file-loader?name=videos/[name].[ext]',
            },
        ],
    },
}