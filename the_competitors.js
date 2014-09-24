
module.exports = [

    // us
    { name: 'validate-email', url: 'https://github.com/StoneCypher/node-validate-email', test: require('validate-email') },

    // other npm folks
    { name: 'validator', url: 'https://www.npmjs.org/package/validator', test: require('validator').isEmail },

    // the other guys
    require('./others/naive.js'),
    require('./others/bvl_so.js'),
    require('./others/sectrean.js'),
    require('./others/voyager_brackets.js'),
    require('./others/voyager_locked.js'),
    require('./others/rfc2822.js'),
    require('./others/steve.js'),
    require('./others/tugrul_asik.js'),
    require('./others/microsoft.js'),
    require('./others/parsley.js'),
    require('./others/sitepoint.js'),
    require('./others/ffalc.js'),
    require('./others/jskit.js')

];
