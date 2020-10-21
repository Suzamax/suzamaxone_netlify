//next.config.js
module.exports = {
    webpack: function(config) {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        },
        {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })
        return config
    }
}