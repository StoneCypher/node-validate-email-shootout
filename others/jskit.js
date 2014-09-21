
module.exports = {

    name: 'JsKit',
    url: 'http://www.javascriptkit.com/script/script2/acheck.shtml',

    test: function(addr) {
        return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(addr);
    }

};
