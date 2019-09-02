const isProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false,

                "useBuiltIns": "usage",
                "corejs": {
                    "version": 3,
                    "proposals": true,
                },

                // "useBuiltIns": "usage", //entry
                // "corejs": 3,
                // corejs: { version: '3.2', proposals: true },
                "targets": {
                    "ie": "9"
                }
            }
        ],
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-transform-modules-commonjs",
        ["@babel/plugin-transform-runtime",
            {
                "regenerator": true,
                "corejs": 3
            }
        ],
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", {"loose": true}],
        "@babel/plugin-syntax-dynamic-import",
        ["component", {
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
