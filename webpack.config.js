const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "public/assets/app.css",
    allChunks: true,
});

module.exports = {
    entry: ['./src/javascript/app.js', './src/scss/app.scss'],
    output: {
        filename: './public/assets/app.js'
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }]
            }),
        }],
    },
    plugins: [
        extractSass
    ]
};