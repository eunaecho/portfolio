const path = require('path');
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    name: 'voc-setting',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./src/client'],
    }, 

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR', 'last 2 chrome versions'], //browserslist
                        },
                        debug: true,
                        "useBuiltIns": "entry"
                    }],
                    '@babel/preset-react',
                ],
                plugins: [
                    'react-refresh/babel'
                ]
            }
        }
        ]
    },

    plugins: [
        new ReactRefreshWebpackPlugin()
    ],

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },

    devServer: {
        devMiddleware: {publicPath: '/dist/'},
        static: { directory: path.resolve(__dirname) },
        hot: true
    }

}