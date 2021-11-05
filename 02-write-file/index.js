const fs = require('fs'); //расширение д/работы с файловой системой
/*----------*/
const path = require('path'); //расширения д/работы с путями*/
/*---------*/
/*readline модуль предоставляет интерфейс для чтения данных из потока
 (например, process.stdin) по одной строке за раз.*/
const readline = require('readline');// 
const way = path.join(__dirname, 'text.txt');
/*-----*/
let info;
/*const rl = readline.createInterface(stdin);*/
/*-----*/
const myStream = fs.createReadStream(__filename);

myStream.on('open', function () {
    fs.open(way, 'a+', (err) => {
        if (err) throw err;
    });
    console.log('Hello.Enter yout text...\n');   //in which case it is a Readable stream.
    process.stdin.on('data', (data) => {                   //in which case it is a Writable stream.
        info = data.toString().trim();
        if (info === 'exit') {
            end();
        }
        fs.appendFile(way, info, (err) => {
            if (err) throw err;
        })
        function end() {
            console.log('Exit?! Ok. The end');
            process.exit();
        }
        process.on('SIGINT', end);
    });

});

    //Здесь метод fs.open() используется для создания нового файла. В качестве первого аргумента он принимает имя файла.
//Его второй аргумент представляет собой флаг, указывающий системе на то, что именно мы хотим сделать с файлом
//node 02-write-file