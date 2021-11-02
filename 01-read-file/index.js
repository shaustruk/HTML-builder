/*01 task ----- 
*В файле index.js директории 01-read-file
* напишите скрипт выводящий в консоль
* содержимое файла text.txt.-----*/

/*Поток это JavaScript объект, который получает информацию о ресурсе, 
в данном случае путь к файлу — «__filename» 
и который умеет с этим ресурсом работать*/
/*node 01-read-file*/
const fs = require('fs'); //расширение д/работы с файловой системой
const path = require('path'); //расширения д/работы с путями*/
const way = path.join(__dirname, 'text.txt');

/*fs.ReadStream реализует стандартный интерфейс чтения,
 который описан в классе stream.Readable.
 */
const myStream = fs.createReadStream(way, { encoding: 'utf-8' }); //
myStream.on('data', function (el) {
    console.log(el.trim());
});
/*Метод trim() удаляет пробельные символы с начала и конца строки*/
