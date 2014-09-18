
module.exports = {

    name: 'Tugrul Asik',
    url: 'http://stackoverflow.com/a/14622590/763127',

    test: function(addr) {
        return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(addr);
    }

};
