const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
// const webpackConfig = require("./webpack.config.js");
const base = require('./config/base')(__dirname);

const vendorConfig = {
    mode:'none',
    entry: {
        simple_vendor: ['vue']
    },
    output: {
        library: '_dll_[name]',
        path: base('dist/dll')
    },
    plugins: [
        // new MyExampleWebpackPlugin()
        new webpack.DllPlugin({
            name: '_dll_[name]',
            // path: _path("cache/[name].dll.manifest.json"),
            path: base("cache/dll/[name].dll.manifest.json"),
            context: base('node_modules'),
        }),

    ]
};

webpack(vendorConfig, (error, stats) => {
    if (error || stats.hasErrors()) {
        if (error) return;

        const statsJson = stats.toJson();

        statsJson.errors.forEach(error => console.log('\n' + error.toString().red + '\n'));

        return;
    }

    const statsJson = stats.toJson();


    const assets = statsJson.assets;

    console.info('\n compiling done. 0 errors');


    console.info(assets);

});


const bundleConfig = {
    mode:'none',
    entry: {
        simple_bundle: base('src/pages/simple/index.js')
    },
    plugins: [
        new MyExampleWebpackPlugin()
    ]
};

// const server = new WebpackDevServer(webpack(bundleConfig), {
//
//     hot: false,
//     inline: false,
//
//     host: '0.0.0.0',
//     contentBase: [
//         base('public')
//     ],
//
//
//     // contentBase: "app",
//     // host: "notice.worksmobile.com",
//     // publicPath: '/assets/',
//     // stats: {
//     //     hot: true,
//     //     colors: true
//     // }
// }).listen(8080, "0.0.0.0", function(err) {
//     // if (err) throw new gutil.PluginError("webpack-dev-server", err);
//     // gutil.log("[webpack-dev-server]", "http://localhost:80/webpack-dev-server/index.html");
// });




