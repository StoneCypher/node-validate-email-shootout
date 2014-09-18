
module.exports = {

    name: 'RFC2822 HTML5',
    url: 'https://fightingforalostcause.net/content/misc/2006/compare-email-regex.php',

    test: function(addr) {
        return /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(addr);
    }

};
