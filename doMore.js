var fs = require("fs");

function _replaceCss(dir) {

    var files = fs.readdirSync('build/'+dir);
    files.forEach(function(item) {
        var path = 'build/'+dir + "/" +item;
        if(/.min.css/.test(path)) {
            var fileContent = fs.readFileSync(path, 'utf-8');
            var imgsDir = 'build/'+dir + "/img";
            if (fs.existsSync(imgsDir)) {
                var imgfiles = fs.readdirSync(imgsDir);
                if (imgfiles && imgfiles.length > 0) {
                    imgfiles.forEach(function(imgItem) {
                        var newImgPath = imgItem.replace(/\w*\./,'');
                        var reg = new RegExp("/"+newImgPath, "ig");
                        fileContent = fileContent.replace(reg, "/"+imgItem);
                    });
                    fs.writeFileSync(path, fileContent, 'utf-8');
                }
            }
        }
    });
}

if(process.argv[2]) {
    _replaceCss(process.argv[2]);
}
else {
    console.log("-------请传参数-------------");
}
