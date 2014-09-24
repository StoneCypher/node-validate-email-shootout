
var competition = require('./the_competitors.js'),

    valid       = require('testdata-valid-email'),
    invalid     = require('testdata-invalid-email'),
    asMarkdown  = false; // whargarbl todo





var maxscore = 0,
    eachmax  = {};

function verify_one(X) {

    var result = { errors: [] },
        score  = 0;

    maxscore   = 0,
    eachmax[X] = 0;

    valid.map(   function(V) { if ( X.test(V)) { ++score; } else { result.errors.push(V); } ++maxscore; } );
    invalid.map( function(I) { if (!X.test(I)) { ++score; } else { result.errors.push(I); } ++maxscore; } );

    result.name  = X.name;
    result.url   = X.url;
    result.score = score;

    return result;

}





function verify(shortForm) {

    var result = competition.map( verify_one );

    if (shortForm || true) {
        for (var i in result) { delete result[i].errors; }
    }

    return result;

}





function Render(res) {

    console.log('\nOf a possible ' + maxscore.toString() + ':\n');

    if (asMarkdown) { console.log('| Score | Pct | Name |\n|-------|-----|------|'); }
    else            { console.log('    Sco Pct   Name\n    --- ----- -----------'); }

    res.map(function(X) {

        if (asMarkdown) { console.log('| ' + X.score + ' | ' + (X.score / maxscore * 100).toFixed(2) + ' | [' + X.name + '](' + X.url + ') |'); }
        else            { console.log('    ' + X.score + ' ' + (X.score / maxscore * 100).toFixed(2) + ' ' + X.name);      }

    });

    if (asMarkdown) { console.log('\nWinner:\n    [' + res[0].name + '](' + res[0].url + ')'); }
    else            { console.log('\nWinner:\n    ' + res[0].name + '\n    ' + res[0].url); }

}




Render(verify().sort(function(X,Y) { return X.score < Y.score? 1 : (X.score > Y.score? -1 : 0); }));
