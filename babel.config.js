const isProduction = (process.env.NODE_ENV === 'production');
const isBuild = (process.env.NODE_ENV === 'build');
const isIE = (process.env.BROWSER === 'ie');

module.exports = {
    "presets": [

        ...[].concat((isBuild||isProduction||isIE)?[
            [
                "@babel/preset-env",
                {
                    "modules": false,

                    "useBuiltIns": "usage",
                    "corejs": {
                        "version": 3,
                        "proposals": true,
                    },

                    "targets": {
                        "ie": "9"
                    }
                }
            ]
        ]:[]),

        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-transform-modules-commonjs",

        ...[].concat((isBuild||isProduction||isIE)?[
            ["@babel/plugin-transform-runtime",
                {
                    "regenerator": true,
                    "corejs": 3
                }
            ]
        ]:[]),

        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", {"loose": true}],
        "@babel/plugin-syntax-dynamic-import",
        [
            "component", {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ],

        ...[].concat(isProduction?[
            "transform-remove-debugger",
            "transform-remove-console"
        ]:[])
    ]
};
