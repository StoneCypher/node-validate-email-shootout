
module.exports = {

    name: 'Naive @ and . test',
    url: 'http://stackoverflow.com/a/9204568/763127',

    test: function(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

};
