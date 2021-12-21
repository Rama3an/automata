let fs = require('fs');
let arg = process.argv;

fs.readFile(arg[2], (err, dataS) => {
    if (err) {
        console.error(err);
        return;
    }
    let S = dataS.toString();
    let n = S.length;

    fs.readFile(arg[3], (err, dataT) => {
        if (err) {
            console.error(err);
            return;
        }
        let T = dataT.toString();
        let m = T.length;
        let alph = new Array();

        for (i = 0; i < m; i++)
            alph[T.charAt(i)] = 0;

        let del = new Array(m + 1);

        for (j = 0; j <= m; j++)
            del[j] = new Array();

        for (i in alph)
            del[0][i] = 0;


        for (j = 0; j < m; j++) {
            prev = del[j][T.charAt(j)];
            del[j][T.charAt(j)] = j + 1;
            for (i in alph) {
                del[j + 1][i] = del[prev][i];
            }
        }

        let array = new Array();

        let cond = 0;
        for (let i = 0; i < n; ++i) {
            if (S.charAt(i) in alph) {
                cond = del[cond][S.charAt(i)];
                if (cond == m)
                    array.push(i - m + 2);
            }
            else
                cond = 0;
        }


        let final = `Строка: ${S}\n Подстрока: ${T}\n`;

        if (array.length != 0)
            for (let i = 0; i < array.length; ++i)
                final += `${i + 1} вхождение слева, с символа: ${array[i]}\n`;
        else
            final += "Error!\n";

        fs.writeFile('final.txt', final, (err) => {
            if (err) {
                console.err(err);
                return;
            }
        });
    })
});