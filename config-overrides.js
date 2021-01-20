const { override } = require('customize-cra');
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
    'default-src': `'self' ${process.env.REACT_APP_IMAGE_ROUTE} fonts.gstatic.com 'unsafe-inline'`,
    'base-uri': "'self'",
    'object-src': "'none'",
    "X-Frame-Options": "DENY",
    'script-src': ["'self'", `${process.env.REACT_APP_IMAGE_ROUTE}`],
    'style-src': ["'self' 'unsafe-inline'"]
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