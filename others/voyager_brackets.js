
module.exports = {

    name: 'Voyager w/ brackets',
    url: 'http://stackoverflow.com/a/9204568/763127',

    test: function(email) {
        return /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
    }

};
