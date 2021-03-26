const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

const {
    NODE_ENV = 'production',
} = process.env;

module.exports = {
    entry: './src/server.js',
    mode: NODE_ENV,
    target: 'node',
    watch: NODE_ENV === 'development',
    externals: [nodeExternals()],
    plugins: [
        new Dotenv({
            safe: true,
            allowEmptyValues: false,
        })
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-private-methods',
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js'],
        fallback: {
            util: false,
            buffer: false,
            path: false,
            stream: false,
            http: false,
            zlib: false,
            crypto: false,
            assert: false,
            fs: false,
            net: false,
            url: false,
            querystring: false,
        },
        alias: {
            '@/Controllers': path.join(__dirname, '/src/Controllers'),
            '@/Provider': path.join(__dirname, '/src/Provider'),
            '@/Views': path.join(__dirname, '/src/Views'),
            '@/utils': path.join(__dirname, '/src/utils'),
        }
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    }
}