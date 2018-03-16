//srcm : static resource centralized management
var fs = require("fs");
var exec = require("child_process").exec;

if (process.argv[2]) {
    syncSrcm(process.argv[2], "vm");
    parseInclude(process.argv[2]);

     //$tempFolder/template
    var commonDir = 'lufax-public-template/';

     /*从src的buile目录copy过来*/
    exec("cp -r wam/build/* lufax-public-template/template", function (error, stdout, stderr) {
        console.log("create common path");
    });
}
else {
    errorMsg("找不到要执行的目录");
}

/*
 *升级集中式管理中涉及到的文件版本-----begin
 *遍历文件夹dir，返回type类型的文件
 */
function walk(dir, type) {
    var getFiles = "";
    if (!fs.existsSync(dir)) {
        errorMsg('walk dir is not exist');
        return;
    }
    var files = fs.readdirSync(dir);
    if (files && files.length > 0) {
        files.forEach(function (item) {
            if (fs.statSync(dir + item).isDirectory()){
                var childFiles = walk(dir + item + "/", type);
                if (childFiles) {
                    getFiles += childFiles;
                }
            }
            else if (item!="." && item!=".." && new RegExp(type+"$").test(item) && item.length>0) {
                getFiles += ',' +  dir + item ;
            }
        });

        return getFiles;
    }
}

function syncSrcm(dir, type) {
    var srcmTplFiles = walk(dir+"/", type).split(',');

    for (var i = 0; i < srcmTplFiles.length; i++) {
        if (fs.existsSync(srcmTplFiles[i])) {
            var fileContent = "",
                nfcReg = /(lufax-public\/)([\w-\/\.]*)(js|css)/g,
                componentNames = [],
                componentVersion = "";

            fileContent = fs.readFileSync(srcmTplFiles[i], 'utf-8');
            componentNames = fileContent.match(nfcReg) || "";

            for (var j = 0; j<componentNames.length; j++) {
                var componentName = componentNames[j].substring(componentNames[j].indexOf("/")+1,componentNames[j].lastIndexOf("/")),
                    componentType = componentNames[j].substring(componentNames[j].lastIndexOf(".")+1,componentNames[j].length);

                if (fs.existsSync("build/"+componentName)) {
                    var files = fs.readdirSync("build/"+componentName);
                    if (files && files.length > 0){
                        files.forEach(function(item){
                            if(!item.match(/\.min\./g)){
                                return;
                            }
                            var _version = item.substring(0, item.indexOf(".")),
                                _type = item.substring(item.lastIndexOf(".")+1,item.length);
                            if(_type == componentType){
                                componentVersion = _version;
                            }
                        });
                        var reg = new RegExp("(\\w*)\."+componentName+"\.min\."+componentType, "g");
                        fileContent = fileContent.replace(reg, componentVersion+"."+componentName+".min."+componentType);
                    }
                }
            }

            fs.writeFileSync(srcmTplFiles[i], fileContent, "utf-8");
        }
    }
}

/*升级集中式管理中涉及到的文件版本-----end*/

/*生成最终的tpl-----begin
 * 根据cong.json
 */
function parseInclude(dir) {
    if (!fs.existsSync(dir)) {
        errorMsg(dir);
    }
    var folders = fs.readdirSync(dir);

    if (folders && folders.length>0) {
        /*遍历dir，dir=wam*/
        folders.forEach(function (folder) {
            /*不遍历common和build*/
            if(/.*?.js$/.test(folder) || folder == "common" || folder == "build"){
                return;
            }

            var buildTplDir = dir + "/build/" + folder + "/";

            //如果build下不存在子目录，则创建之
            if(!fs.existsSync(buildTplDir)) {
                //exec("mkdir "+buildTplDir, function (error, stdout, stderr) {});
                checkDir(buildTplDir);
            }

            var confFile = dir + "/" + folder + "/conf.json";

            if (fs.existsSync(confFile)) {
                var confFileContent = fs.readFileSync(confFile, 'utf-8');
                var data = '';
                if (confFileContent) {
                    data = JSON.parse(confFileContent);
                }
                else {
                    errorMsg('conf file is not exist');
                    return;
                }

                var template = /header|navigator|footer/,
                    buildFile = "";

                for (var x in data) {
                    //容错处理：配置项为空时给出提示
                    if (data[x].length <= 0) {
                        errorMsg(data[x] + 'config msg error');
                    }

                    //配置项为false，即不需要处理
                    if (data[x][0]) {
                        buildFile = buildTplDir + x +".html";
                        //reset to empty to avoidance of repetition
                        if (fs.existsSync(buildFile)) {
                            fs.writeFileSync(buildFile, "" ,"utf-8");
                        }

                        /*处理 header|navigator|footer*/
                        if (x.match(template)) {
                            var tplFile = dir + "/" + data[x][1];
                            if (!fs.existsSync(tplFile)) {
                                errorMsg(tplFile + 'is not exist');
                            }
                            var dataItem = '';
                            var tplFileContent = fs.readFileSync(tplFile,"utf-8");
                            if (tplFileContent) {
                                dataItem = JSON.parse(tplFileContent);
                            }

                            //dataItem = JSON.parse(fs.readFileSync(tplFile,"utf-8")),
                            var src = dataItem.src;
                            if (!fs.existsSync(src)) {
                                errorMsg(src);
                            }

                            /*从src的buile目录copy过来*/
                            exec("cp " + src + " " + buildFile, function (error, stdout, stderr) {
                                console.log("create: " + buildFile);
                            });

                            var lufaxBuildFile = buildFile.replace('.html', '.lufax.com.html');
                            /*从src的buile目录copy过来*/
                            exec("cp " + src + " " + lufaxBuildFile, function (error, stdout, stderr) {
                                console.log("create: " + buildFile);
                            });

                            //process lu header files
                            var luDataItem = '';
                            var lutplFile = '';
                            if (tplFile.indexOf('lu') < 0) {
                                lutplFile = tplFile.replace('.vm', '-lu.vm');
                            }
                            else {
                                lutplFile = tplFile;
                            }

                            var lutplFileContent = fs.readFileSync(lutplFile, 'utf-8');
                            if (lutplFileContent) {
                               luDataItem = JSON.parse(lutplFileContent);
                            }

                            //dataItem = JSON.parse(fs.readFileSync(tplFile,"utf-8")),
                            var srcLu = luDataItem.src;
                            if (!fs.existsSync(srcLu)) {
                                errorMsg(srcLu);
                            }

                            var luBuildFile = buildFile.replace('.html', '.lu.com.html');
                            /*从src的buile目录copy过来*/
                            exec("cp " + srcLu + " " + luBuildFile, function (error, stdout, stderr) {
                                console.log("create: " + buildFile);
                            });

                            var common2Dir = buildFile.replace('wam/build', 'lufax-public-template-lu/template');
                            checkDir(common2Dir.substring(0, common2Dir.lastIndexOf('/')));
                            exec("cp " + srcLu + " " + common2Dir, function (error, stdout, stderr) {
                                console.log("create: " + buildFile);
                            });
                        }
                        else {
                            /*处理非 header|navigator|footer，支持多项配置的情况*/
                            var totalContent = '';

                            for (var y = 1; y < data[x].length; y++) {
                                var tplFile = dir + "/" + data[x][y];
                                if (!fs.existsSync(tplFile)) {
                                    errorMsg(tplFile);
                                }
                                var detailArgs = fs.readFileSync(tplFile, "utf-8");
                                totalContent += detailArgs;
                                /*将配置的依赖项依次写入tpl*/
                                fs.appendFileSync(buildFile, detailArgs + '\n\n');
                            }
                            var common2Dir = buildFile.replace('wam/build', 'lufax-public-template-lu/template');
                            checkDir(common2Dir.substring(0, common2Dir.lastIndexOf('/')));
                            fs.writeFileSync(common2Dir, totalContent, 'utf-8');
                            console.log("create: " + buildFile);
                        }
                    }
                    else {
                        data[x][0] = true;
                    }

                    //reset to false, default false
                    if (data[x][0] === true) {
                        //data[x][0] = false;
                    }
                }
                /*将文件conf.json中的开关全部关闭*/
                data = JSON.stringify(data, data, 4);
                fs.writeFileSync(confFile, data, 'utf-8');
            }
            else {
                errorMsg(confFile);
            }
        });
    }
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

function errorMsg(text) {
    console.log("srcm error message: " + text);
    return false;
}
/*生成最终的tpl-----end*/