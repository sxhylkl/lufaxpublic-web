/**
 * name: domainSwitch
 * depends: nodejs
 * author: wangyaqiong
 * date: 2015/03/17
 */

/**
 *功能：域名之前切换lufax和lu
 *@调用方式 ： node domainSwitch.js +filepath
 */
var fs = require("fs");
var exec = require("child_process").exec;

//var desOutputFolder = '';
var desOutputFolder = 'build/';
var desDomain = 'www.lu.com';

/**
 * walkDir
 * 循环遍历传入文件夹下的所有文件
 * @param path 路径
 * @param floor 遍历的深度
 * @param handleFile 执行完成之后的回调函数 可选
 */
function walkDir(path, floor, handleFile) {
    floor++;
    var files = fs.readdirSync(path);
    if (files && files.length > 0){
        files.forEach( function(item) {
            var singleFile = path + '/' + item;
            var stats = fs.statSync(singleFile);

            if (stats.isDirectory()) {
                walkDir(singleFile, floor, handleFile);
            }
            else {
                var typeRxp = /js$|vm$|html$/ig;
                //checkDir(desOutputFolder +  path);
                var desFile = desOutputFolder + singleFile;
                if (singleFile.match(typeRxp)){
                    handleFile(singleFile, desFile);
                }
            }
        });
    }
}

function fileDomainProcess(fileName, desFileName) {
    if (!fileName || !fs.existsSync(fileName)) {
        console.log('file not exists');
        return;
    }

    var file = fs.readFileSync(fileName, 'utf-8');
    var sep = ['\'', '"'];
    var domainExp = /(http|https):\/\/(\w*).lufax.com/ig;
    var luFile = '';
    if(fileName.match(/js$/ig)) {
        domainExp = /(window\.)*(\s*href=\s*)*('|")(http|https):\/\/(\w*).lufax.com/ig;
            luFile = file.replace(domainExp,
            function(){
                //var arg = arguments.splice(1);
                var arg = Array.prototype.slice.call(arguments, 1);
                var finSep = '';
                var len  = arg.length;
                for (var i = 0; i < len; i++) {
                    if (!arg[i]) {
                        arg[i] = '';
                    }
                }

                if (!arg[0] && arg[1]) {
                    if (arg[2] == sep[0]) {
                        finSep = sep[1];
                    }
                    else {
                        finSep = sep[0];
                    }
                }
                else {
                    finSep = arg[2];
                }
                var returnVal = arg[0] + arg[1] + arg[2] + arg[3]+'://'+ arg[4] + '.' + finSep;
                returnVal += ' + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".")' + ' + ' + finSep;

                return returnVal;
            });
    } else if(fileName.match(/css|vm|html$/ig)) {

        var domainExp = /(\w*.)lufax.com/ig;
        luFile = file.replace(domainExp, function(){
            var arg = Array.prototype.slice.call(arguments, 1);
            if (arg[0] == 'static.') {
                return arg[0] + "lufaxcdn.com";
            }
            else {
                return arg[0] + "lu.com";
            }
            });

    }

   /* if (desFileName && fileName.match(/vm|html$/ig)) {

            fs.writeFileSync(desFileName, luFile, 'utf-8');
    }
    else {
        if (type == 'js') {*/
            //rewrite js file
        fs.writeFileSync(fileName, luFile, 'utf-8');
        //}
    //}
}

/*
 * 检查路径是否存在，如果不存在新建路径中文件夹
 *
 */
function checkDir(path) {
    if (!path) {
        return false;
    }
    if (fs.existsSync(path)) {
        return true;
    }
    else {
        var pathArray = path.split('/');
        var len = pathArray.length;
        var currentDir = '';
        for (var i = 0; i < len; i++) {
            currentDir += pathArray[i] + '/';
            if (!fs.existsSync(currentDir)) {
                fs.mkdirSync(currentDir);
            }
        }
        return true;
    }
}

walkDir('lufax-public-template-lu', 0, fileDomainProcess);


