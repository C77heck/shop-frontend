const { override } = require('customize-cra');
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
    'default-src': `'self' ${process.env.REACT_APP_IMAGE_ROUTE} fonts.gstatic.com fonts.googleapis.com  'unsafe-inline'`,
    'base-uri': "'self'",
    'object-src': "'none'",
    'script-src': ["'self'", `${process.env.REACT_APP_IMAGE_ROUTE}`, "fonts.googleapis.com"],
    'style-src': ["'self' 'unsafe-inline'", "fonts.googleapis.com"]
};

function addCspHtmlWebpackPlugin(config) {
    if (process.env.NODE_ENV === 'production') {
        config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy));
    }

    return config;
}

module.exports = {
    webpack: override(addCspHtmlWebpackPlugin),
};


