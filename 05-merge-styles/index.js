/*node 05-merge-styles*/
const fs = require('fs');   //расширение д/работы с файловой системой
const path = require('path'); //расширения д/работы с путями
const wayToStyles = path.join(__dirname, 'styles');
const wayTobandle = path.join(__dirname, 'project-dist', 'bundle.css');

let myWriteStream = fs.createWriteStream(wayTobandle, 'utf-8');

fs.readdir(wayToStyles, (err, array) => {
    if (err) throw err;
    array.forEach(el => {               //array with files
        if (err) throw err;
        let myReadStream = fs.createReadStream(path.join(wayToStyles, `${el}`), 'utf-8');
        if (err) throw err;
        let fileName = path.join(wayToStyles, `${el}`);
        fs.stat(fileName, (err, stats) => {
            if (err) throw err;
            if (stats.isFile() == true && path.extname(el).slice(1) == 'css') {             //get files
                fs.readFile(path.join(wayToStyles, `${el}`), 'utf8', function (error, fileContent) {
                    if (error) throw error; // ошибка чтения файла, если есть
                    myReadStream.pipe(myWriteStream);
                    if (err) throw err;
                });
            }
        });
    });
});


/*Pipe - это канал, который связывает поток для чтения и поток для записи и позволяет сразу считать из потока чтения в поток записи.*/
/*
const fs = require('fs');   //расширение д/работы с файловой системой
const path = require('path'); //расширения д/работы с путями
const wayToStyles = path.join(__dirname, 'styles');
const wayTobandle = path.join(__dirname, 'project-dist', 'bundle.css');

const readline = require('readline');
const rl = readline.createInterface

let myWriteStream = fs.createWriteStream(path.join(wayTobandle), 'utf-8');

fs.readdir(wayToStyles, (err, array) => {
    if (err) throw err;
    array.forEach(el => {               //array with files
        let myReadStream = fs.createReadStream(path.join(wayToStyles, `${el}`), 'utf-8');
        let fileName = path.join(wayToStyles, `${el}`);
        fs.stat(fileName, (err, stats) => {
            if (err) throw err;
            if (stats.isFile() == true && path.extname(el).slice(1) == 'css') {             //get files
                fs.readFile(path.join(wayToStyles, `${el}`), 'utf8', function (error, fileContent) {
                    if (error) throw error; // ошибка чтения файла, если есть
                    //console.log(fileContent); // содержимое файла
                    let rl = readline.createInterface({
                        input: myReadStream
                    });
                    rl.on('line', (line) => {
                        myWriteStream.write(line + '\n');
                    });
                });
            }
        });
    });
});
/*
const fs = require('fs');
const path = require('path');
const readline = require('readline');


let linkFile1 = path.join(__dirname, 'styles');
let linkFile2 = path.join(__dirname, 'project-dist', 'bundle.css');

let myWriteStream = fs.createWriteStream(linkFile2, 'utf-8');
myWriteStream.on('error', (err) => console.log(err.message));

fs.readdir(linkFile1, (err, files) => {
    if (err) throw err;
    files.forEach(f => {
        if (path.extname(f) === '.css') {
            let myReadStream = fs.createReadStream(path.join(linkFile1, f), 'utf-8');
            myReadStream.on('error', (err) => console.log(err.message));
            let rl = readline.createInterface({
                input: myReadStream
            });
            rl.on('line', (line) => {
                myWriteStream.write(line + '\n');
            });
        }
    });
});*/