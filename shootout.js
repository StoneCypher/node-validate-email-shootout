
var competition = require('./the_competitors.js'),

    valid       = require('testdata-valid-email'),
    invalid     = require('testdata-invalid-email');





var maxscore = 0;

function verify_one(X) {

    var result = { errors: [] },
        score  = 0;

    maxscore   = 0;

    valid.map(   function(V) { if ( X.test(V)) { ++score; } else { result.errors.push(V); } ++maxscore; } );
    invalid.map( function(I) { if (!X.test(I)) { ++score; } else { result.errors.push(I); } ++maxscore; } );

    result.name  = X.name;
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





var res = verify().sort(function(X,Y) { return X.score < Y.score? 1 : (X.score > Y.score? -1 : 0); });

console.log('Of a possible ' + maxscore.toString() + ':');
res.map(function(X) {
  console.log('  ' + X.score + ' ' + X.name);
});