const fs = require('fs');   //расширение д/работы с файловой системой
const path = require('path'); //расширения д/работы с путями
const readline = require('readline');
/*from*/
const wayToTemplate = path.join(__dirname, 'template.html');
const wayToStyles = path.join(__dirname, 'styles');
const wayToAssetsOriginal = path.join(__dirname, 'assets');
/*to*/
const wayToProjectDist = path.join(__dirname, 'project-dist');
const wayToIndexHTML = path.join(wayToProjectDist, 'index.html');
const wayAssetsInProjectDist = path.join(wayToProjectDist, 'assets');
/*components*/
const waytoHeader = path.join(__dirname, 'components', 'header.html');
const waytoArticles = path.join(__dirname, 'components', 'articles.html');
const waytofooter = path.join(__dirname, 'components', 'footer.html');
const waytoAbout = path.join(__dirname, 'components', 'about.html');
/*-----*/
let myWriteStream = fs.createWriteStream(path.join(wayToProjectDist, 'style.css'), 'utf-8');
/*---script---*/

//create dir
fs.mkdir(wayToProjectDist, { recursive: true }, err => {
    if (err) throw err; // не удалось создать папку
    console.log('Папка project-dist успешно создана');

});
//create file idex.html
fs.open(path.join(wayToProjectDist, 'index.html'), 'w', (err) => {
    if (err) throw err;
    console.log('File created/index');
});
fs.open(path.join(wayToProjectDist, 'style.css'), 'w', (err) => {
    if (err) throw err;
    console.log('File created/style');
});
//read & write tags
fs.readFile(wayToTemplate, 'utf8', function (error, data) {
    if (error) throw error; // ошибка чтения файла, если есть
    //read header
    fs.readFile(waytoHeader, 'utf8', function (error, header) {
        if (error) throw error; // ошибка чтения файла, если есть
        data = data.toString().replace(/{{header}}/, header);
        //read articles
        fs.readFile(waytoArticles, 'utf8', function (error, articles) {
            if (error) throw error; // ошибка чтения файла, если есть
            data = data.toString().replace(/{{articles}}/, articles);
            //read footer
            fs.readFile(waytofooter, 'utf8', function (error, footer) {
                if (error) throw error; // ошибка чтения файла, если есть
                data = data.toString().replace(/{{footer}}/, footer);
                //write to file index.html
                fs.writeFile(wayToIndexHTML, data, function (err) {
                    if (err) throw err;
                });
            });
        });
    });
});
//create style.css
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
                    myReadStream.pipe(myWriteStream);
                    if (err) throw err;
                });
            }
        });
    });
});
//create assets
createDirAssets();
function createDirAssets() {
    fs.stat(wayAssetsInProjectDist, function (err, stats) {
        if (!err) {
            fs.rm(wayAssetsInProjectDist, { recursive: true }, (err) => {
                if (err) throw err;
                return createDirAssets();                                       //dir found and we have to return fuction for create dir
            });
        }
        else {
            fs.mkdir(wayAssetsInProjectDist, { recursive: true }, err => {
                if (err) throw err; // не удалось создать папку              //create directory
                copyDirFiles();
                function copyDirFiles() {
                    fs.readdir(wayToAssetsOriginal, (err, array) => {        //reading files in original folder
                        //  console.log(array);
                        if (err) throw err;
                        array.forEach(el => {
                            if (err) throw err;
                            //   console.log(el);
                            let fileName = path.join(wayToAssetsOriginal, `${el}`);
                            fs.stat(fileName, (err, status) => {
                                if (err) throw err;
                                if (status.isFile() == true) {
                                    fs.copyFile(path.join(wayToAssetsOriginal, `${el}`), (path.join(wayAssetsInProjectDist, `${el}`)), (err) => {
                                        if (err) throw err;

                                    });
                                }
                                else {
                                    fs.mkdir(path.join(wayAssetsInProjectDist, `${el}`), { recursive: true }, err => {
                                        if (err) throw err;
                                    });
                                    fs.readdir(fileName, { recursive: true }, (err, file) => {
                                        file.forEach(intro => {
                                            fs.copyFile(path.join(wayToAssetsOriginal, `${el}`, `${intro}`), (path.join(wayAssetsInProjectDist, `${el}`, `${intro}`)), (err) => {
                                                if (err) throw err;
                                            });
                                        })
                                    });
                                }
                            });
                        });
                    })
                }
            });
        }
    });
}