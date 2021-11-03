/*
В файле index.js директории 04-copy-directory реализуйте функцию copyDir которая копирует содержимое папки files
в папку files-copy

*После завершения работы функции создаётся папка files-copy
содержимое которой является точной копией исходной папки files.
* При добавлении/удалении/изменении файлов в папке files и повторном запуске
node 04-copy-directory содержимое папки files-copy актуализируется*/
/*-----------------*/

const fs = require('fs');   //расширение д/работы с файловой системой*/
const path = require('path'); //расширения д/работы с путями
const myStream = fs.createReadStream(__filename);//create stream

const fsPromises = fs.promises;

const dirNameCopy = path.join(__dirname, 'files-copy');
const dirNameOriginal = path.join(__dirname, 'files');

myStream.on('open', function createDir() {
    fs.stat(dirNameCopy, function (err, stats) {
        if (!err) {
            fs.rm(dirNameCopy, { recursive: true }, (err) => {
                if (err) throw err;
                return createDir();                                       //dir found and we have to return fuction for create dir 
            });
        }
        else {
            fsPromises.mkdir(dirNameCopy).then(function () {               //create directory
                fs.readdir(dirNameOriginal, function (err, files) {        //reading files in original folder
                    if (err) throw err;
                    files.forEach(el => {                                   //get name of files in original folder
                        fs.copyFile(path.join(dirNameOriginal, `${el}`), (path.join(dirNameCopy, `${el}`)), (err) => {
                        });
                    })
                });
            }).catch(function () {
                console.log('failed to create directory');
            });

        }

    });

});