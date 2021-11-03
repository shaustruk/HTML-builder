/*
При выполнении команды node 03-files-in-folder в корневом каталоге репозитория в консоль выводится информация о файлах,
 содержащихся внутри 03-files-in-folder/secret-folder. 
 Данные должны быть выведены в формате <имя файла>-<расширение файла>-<вес файла>. Пример: example - txt - 128.369kb 
 (округлять не нужно, конвертация в кб по желанию!)
 Информация должна выводиться только для файлов. Наличие информации о директориях считается ошибкой.*/
/*-------------------*/

const fs = require('fs');   //расширение д/работы с файловой системой*/
const path = require('path'); //расширения д/работы с путями
const way = path.join(__dirname, 'secret-folder');



const myStream = fs.createReadStream(__filename);//create stream

myStream.on('open', function () {
    fs.readdir(way, (err, data) => {
        data.forEach(el => {
            let fileName = path.join(__dirname + '/secret-folder/' + `${el}`);
            fs.stat(fileName, (err, stats) => {
                if (err) throw err;
                if (stats.isFile() == true) {
                    console.log(`<${el.split('.').slice(0, 1)}>-<${((path.extname(el)).slice(1))}>-<${Math.ceil((stats.size) / 1000)} kb>`);
                }
            });

        });
    });
});





