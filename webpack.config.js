const path = require('path');

/**
 * Esse arquivo irá chamar todos os outros arquivos js, sem a necessidade de chamar todos no 
 * arquivo html
 */
module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '/dist'),
        publicPath: 'dist'
    }
}