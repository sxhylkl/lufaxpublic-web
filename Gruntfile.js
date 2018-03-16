'use strict';



String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, ""); 
} 
module.exports = function (grunt) {
    var concatJson = grunt.file.readJSON('concat-new.json'),
    //var concatJson = grunt.file.readJSON('concat.json'),
        defaultTask = [];

    // Project configuration.
    var config = {
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        clean: {
            cleanzip: {
                //src: ["static-lufax-public.zip"]
            }
        },
        concat: {},
        uglify: {},
        watch: {
            files: ['**/*.md', '**/*.less', '**/*.jade'],
            tasks: ['markdown', 'less', 'jade'],
            options: {
                livereload: true
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9001,
                    base: '.'
                }
            }
        },
        yuidoc: {
            compile: {
                options: {
                    paths: 'src/',
                    outdir: 'docs/'
                }
            }
        },
        markdown: {
            all: {
                files: [
                    {expand: true, src: 'markdown/**/*.md', dest: 'md2html', ext: '.html'}
                ]
            }
        },
        less: {
            development: {
                options: {
                    path: "src/"
                },
                files: {
                    "src/lufax.css": "src/lufax.less"
                }
            }

        },

        cssmin: {

        },
        copy: {

        },
        

        rev: {
            options: {
                algorithm: 'md5',
                length: 8
            }
                                                   
            
        },
        shell: {
        },
        jade: {
            debug: {
                options: {
                    
                    pretty: true     
                },
                files: {
                        "publish.html": "publish.jade"
                }
            }

        }
    };

    function _setInfo(_name, type, _concat, _ary) {
        config.concat[_name + "_" + type] = {
            "src": _concat[type].split(","),
            "dest": "build/" + _name + "/" + _name + "." + type
        };

        _ary.push("concat:" + _name + "_" + type);
        if (type == "js") {
            config.uglify[_name + "_" + type] = {
                "src": config.concat[_name + "_" + type].dest,
                "dest": "build/" + _name + "/" + _name + ".min." + type
            }
            _ary.push("uglify:" + _name + "_" + type);
        }
    }


    function _uniq(ary) {
        var _newary = [];
        for(var i = 0 ; i < ary.length ; i ++) {
            if(_newary.indexOf(ary[i].trim()) < 0 ) {
                _newary.push(ary[i]);
            }
        }
        return _newary;
    }


    function _dealDepnd(_concat, concatJson) {
        var depend = _concat.depend,
            jsStrs = "",
            cssStrs = ""
        if(depend) {
            var ary = depend.split(",");
            for(var i = 0 ; i < ary.length ; i ++) {
                var _dependConcat = concatJson[ary[i].trim()];
                if(_dependConcat.js) {
                    jsStrs += _dependConcat.js + ",";
                }
                if(_dependConcat.css) {
                    cssStrs += _dependConcat.css + ",";
                }

            }
            if(_concat.js || jsStrs!="") {
                jsStrs += _concat.js;
                _concat.js = _uniq(jsStrs.split(",")).join(",");

            }
            if(_concat.css || cssStrs!="") {
                cssStrs += _concat.css;
                _concat.css = _uniq(cssStrs.split(",")).join(",");
            }

        }
    }


        for (var _name in concatJson) {
            var _concat = concatJson[_name],
                ary = ["clean:" + _name, 'yuidoc'];
            config.clean[_name] = {src: ['build/' + _name]};

            //deal depend
            _dealDepnd(_concat, concatJson);


            if (_concat["js"]) {
                _setInfo(_name, "js", _concat, ary);
            }
            if (_concat["css"]) {
                config.cssmin[_name] = {
                    expand: true,
                    cwd: 'build/' + _name,
                    src: "*.css",
                    dest: 'build/' + _name,
                    ext: '.min.css'
                }
                _setInfo(_name, "css", _concat, ary);
                ary.push("cssmin:" + _name);

                var imgStr = _concat["css"].replace(/\/\w*\.css|\/\w*-\w*\.css/g, "/img/*");
                config.copy[_name] = {
                    expand: true,
                    flatten: true,
                    src: imgStr.split(","),
                    dest: "build/" + _name + "/img"
                }
                ary.push("copy:" + _name);
            }

            var image_rev = "0"+_name;
            config.rev[image_rev] = {
                files: [{
                    src: ['build/'+image_rev.substring(1)+'/**/*.{jpg,jpeg,gif,png}']
                }]
            }
            ary.push("rev:"+image_rev);

            var doMoreShell = "0"+_name;
            config.shell[doMoreShell] = {
                "command": [
                        'node doMore.js '+doMoreShell.substring(1)
                ].join("&&")
            }
            ary.push("shell:" + doMoreShell);


            config.rev[_name] = {
                files: [{
                    src: ['build/'+_name+'/**/*.min.{js,css}']
                }]
            }
            ary.push("rev:"+_name);

            config.shell[_name] = {
                "command": [
                        //'node doMore.js '+_name,
                        'rm -rf build/'+_name+'/'+_name+'.js',
                        'rm -rf build/'+_name+'/'+_name+'.css',
                        'cp -r build/'+_name+' static-lufax-public/'
                ].join("&&")
            }
            ary.push("shell:" + _name);

            grunt.registerTask(_name, ary);
            defaultTask.push(_name);
        }

    //srcm : static resource centralized management
    var srcmTask = "srcmTask",
        srcmTaskAry = [];
    config.shell[srcmTask] = {
        "command": [
            'node wam/srcm.js wam'
        ].join("&&")
    }
    srcmTaskAry.push("shell:" + srcmTask);

    var taskName = "srcm";
    grunt.registerTask(taskName, srcmTaskAry);
    defaultTask.push(taskName);
    //srcm end

    grunt.registerTask('default', defaultTask);

    grunt.initConfig(config);
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-rev');
    //启动服务器
    grunt.registerTask('server', ['connect', 'watch']);

};
