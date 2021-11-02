const fs = require('fs'); //расширение д/работы с файловой системой
/*----------*/
const path = require('path'); //расширения д/работы с путями*/
/*---------*/
/*readline модуль предоставляет интерфейс для чтения данных из потока
 (например, process.stdin) по одной строке за раз.*/
const readline = require('readline');// 
const stdout = process.stdout; //in which case it is a Readable stream.
const stdin = process.stdin; //in which case it is a Writable stream.
/*-----*/
const way = path.join(__dirname, 'text.txt');
/*-----*/
let info;
const rl = readline.createInterface(stdin);
/*-----*/
const myStream = fs.createReadStream(__filename);

myStream.on('open', function () {

    stdout.write('Hello.Enter yout text...\n');

    stdin.on('data', (data) => {
        info = data.toString().trim();
        if (info === 'exit') {
            console.log('Exit?! Ok')
            process.exit();
        }
        fs.open(way, 'a+', (err) => {
            if (err) throw err;
            fs.appendFile(way, info, (err) => {
                if (err) throw err;
            })
        });
        function ctrlC() {
            console.log('Ok. The end');
            process.exit();
        }
        process.on('SIGINT', ctrlC);
    });
});
    /* Здесь метод fs.open() используется для создания нового файла. В качестве первого аргумента он принимает имя файла.
Его второй аргумент представляет собой флаг, указывающий системе на то, что именно мы хотим сделать с файлом*/
/*node 02-write-file*/