
module.exports = {

    name: 'Microsoft',
    url: 'http://stackoverflow.com/a/20373180/763127',

    test: function(addr) {
        return /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/.test(addr);
    }

};
