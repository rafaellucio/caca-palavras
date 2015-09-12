var fs = require('fs');
var matriz;
var words;
var matchesPosition = [];

fs.readFile('cacapalavra.txt', function(err, data) {
    if (err) return console.log(err);

    matriz = data.toString().split('\n');
    matriz.shift();
    words = matriz.splice(matriz.indexOf('11'));
    words.shift();
    words.pop();

    console.log("===============Matriz=================");
    console.log(matriz);
    console.log("===============Words==================");
    console.log(words);
    console.log("=========Palavras Encontradas=========");
    searchWordLine(matriz);
    console.log(matchesPosition);
    matchesPosition.length = 0;
    console.log("=========Palavras Matriz Inversa=========");
    searchWordLine(reverseMatriz());
    console.log(matchesPosition);

    searchTopRigth('chile', 0, 0, matriz.length);

});

function searchWordLine(m) {
    words.forEach(function(w) {
        var wr = w.split('').reverse().join('');
        for (var i = 0, len = m.length; i < len; i++) {
            if (m[i].indexOf(w) !== -1) {
                matchesPositionAdd(w, m[i].indexOf(w), i);
            }
            if (m[i].indexOf(wr) !== -1) {
                matchesPositionAdd(w, m[i].indexOf(wr), i);
            }
        }
    });
}

function searchTopRigth(w, x, y, lenMatriz) {
    var wtemp = "";

    //	matriz[0][0]
    //		matriz[1][1]
    //	matriz[0][1]
    //		matriz[1][2]
    //	matriz[0][2]
    //		matriz[1][3]

    for (var i = 0; i < matriz.length; i++) {
		y += i;
        for (; x < lenMatriz; x++, y++) {
            wtemp += matriz[x][y];
        }
		x = 0;
		y = 0;
        lenMatriz--;
		wtemp += ',';
    }

	console.log(wtemp.split(','));
}

function reverseMatriz() {
    var reverseMatriz = [];
    var tempLine = '';

    for (var i = 0, len = matriz.length; i < len; i++) {
        matriz.forEach(function(line) {
            tempLine += line[i];
        });
        reverseMatriz.push(tempLine);
        tempLine = '';
    }

    return reverseMatriz;
}

function matchesPositionAdd(w, x, y) {
    matchesPosition.push({
        word: w,
        positionX: x,
        positionY: y
    });
}
