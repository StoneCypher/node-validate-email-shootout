node-validate-email-shootout
============================

A shootout test of node-validate-email





Wat
---

Dude, seriously, how many email validators are there out there?  How hard are
they to pick between?

I got tired of it.  I'm making a proof of it.

I'm going to release a better email validator soon.  I'm not done yet, but my
prerelease is already the 8th best I can find.  (I'm coming for you, Steve.)





It's data time!
---------------

Of a possible 266:

| Score | Pct | Name |
|-------|-----|------|
| 195 | 73.31 | [Steve](http://stackoverflow.com/a/10906478/763127) |
| 195 | 73.31 | [validator](https://www.npmjs.org/package/validator) |
| 195 | 73.31 | [validate-email](https://github.com/StoneCypher/node-validate-email) |
| 194 | 72.93 | [bvl from StackOverflow](http://stackoverflow.com/a/16016476/763127) |
| 194 | 72.93 | [Parsley](http://stackoverflow.com/a/25125279/763127) |
| 190 | 71.43 | [Sectrean](http://stackoverflow.com/a/46181/763127) |
| 174 | 65.41 | [RFC2822 HTML5](https://fightingforalostcause.net/content/misc/2006/compare-email-regex.php) |
| 165 | 62.03 | [Fighting for a Lost Cause](https://fightingforalostcause.net/content/misc/2006/compare-email-regex.php) |
| 156 | 58.65 | [Sitepoint](http://www.sitepoint.com/javascript-validate-email-address-regex/) |
| 153 | 57.52 | [Tugrul Asik](http://stackoverflow.com/a/14622590/763127) |
| 153 | 57.52 | [Microsoft](http://stackoverflow.com/a/20373180/763127) |
| 153 | 57.52 | [JsKit](http://www.javascriptkit.com/script/script2/acheck.shtml) |
| 149 | 56.02 | [Naive @ and . test](http://stackoverflow.com/a/9204568/763127) |
| 145 | 54.51 | [Voyager w/ brackets](http://stackoverflow.com/a/9204568/763127) |
| 132 | 49.62 | [Voyager locked](http://stackoverflow.com/a/9204568/763127) |

Winner:

> [Steve](http://stackoverflow.com/a/10906478/763127)

... for now.  My package is tied with his regex (because I copied it,) so he gets the win.

Improvements incoming.  :smile:





How, please
-----------

First, I gathered a bunch of email test data, and put it into packages like
[testdata-valid-email](https://www.npmjs.org/package/testdata-valid-email),
[testdata-invalid-email](https://www.npmjs.org/package/testdata-valid-email), and
[testdata-newtld-email](https://www.npmjs.org/package/testdata-valid-email), from
excellent community resources like
[Fighting for a Lost Cause](https://fightingforalostcause.net/content/misc/2006/compare-email-regex.php).

Then, I made a mechanic to test them one at a time, and count the results.

Finally, I gathered as many email validators as I could find, and I leveraged them.





Polemic :neckbeard:
-------------------

`node-validate-email-shootout` is MIT licensed, because viral licenses and newspeak language modification are evil.  Free is ***only*** free when it's free for everyone.
