/**
 * name: ajax file upload component
 * depends: jquery
 * require: ajaxfileupload.js
 * author: wangdongqiang
 * date: 2014/09/04
 */

/**
 *功能：ajax方式实现file upload功能
 *@method $.ajaxFileUpload
 *@param {String} url：处理文件上传操作的文件地址
 *@param {Boolean} secureuri：是否启用安全提交，默认为false
 *@param {String} fileElementId：input:file 的id属性值
 *@param {String} dataType：服务器返回的数据格式，一般选json，可以是xml等格式
 *@param {Function} success(data, status)：提交成功后处理函数
 *@param {Function} error(data, status, e)：提交失败处理函数
 *@example var fileUpload = new lufax.ui.fileUpload();
             fileUpload.add({
                    fileElementId:"uploadTest",                  //file upload button
                    url: 'demo.html',                            //处理文件上传操作的地址
                    secureuri: false,                            //是否启用安全提交，默认为false
                    dataType: 'text',                            //服务器返回的格式，一般选json，可以是xml,js,html等格式
                    success: function (data, status){            //提交成功后处理函数
                        $('#result').html('上传成功');
                    },
                    error: function (data, status, e){           //提交失败处理函数
                        $('#result').html('上传失败');
                    }
                });
 */
jQuery.extend({
    createUploadIframe: function(id, uri)
    {
        //create frame
        var frameId = 'jUploadFrame' + id;
        var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
        if(window.ActiveXObject)
        {
            if(typeof uri== 'boolean'){
                iframeHtml += ' src="' + 'javascript:false' + '"';

            }
            else if(typeof uri== 'string'){
                iframeHtml += ' src="' + uri + '"';

            }
        }
        iframeHtml += ' />';
        jQuery(iframeHtml).appendTo(document.body);

        return jQuery('#' + frameId).get(0);
    },
    createUploadForm: function(id, fileElementId, data)
    {
        //create form
        var formId = 'jUploadForm' + id;
        var fileId = 'jUploadFile' + id;
        var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
        if(data)
        {
            for(var i in data)
            {
                jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
            }
        }
        var oldElement = jQuery('#' + fileElementId);
        var newElement = jQuery(oldElement).clone();
        jQuery(oldElement).attr('id', fileId);
        jQuery(oldElement).before(newElement);
        jQuery(oldElement).appendTo(form);



        //set attributes
        jQuery(form).css('position', 'absolute');
        jQuery(form).css('top', '-1200px');
        jQuery(form).css('left', '-1200px');
        jQuery(form).appendTo('body');
        return form;
    },

    ajaxFileUpload: function(s) {
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var id = new Date().getTime()
        var form = jQuery.createUploadForm(id, s.fileElementId, (typeof(s.data)=='undefined'?false:s.data));
        var io = jQuery.createUploadIframe(id, s.secureuri);
        var frameId = 'jUploadFrame' + id;
        var formId = 'jUploadForm' + id;
        // Watch for a new set of requests
        if ( s.global && ! jQuery.active++ )
        {
            jQuery.event.trigger( "ajaxStart" );
        }
        var requestDone = false;
        // Create the request object
        var xml = {}
        if ( s.global )
            jQuery.event.trigger("ajaxSend", [xml, s]);
        // Wait for a response to come back
        var uploadCallback = function(isTimeout)
        {
            var io = document.getElementById(frameId);
            try
            {
                if(io.contentWindow)
                {
                    xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
                    xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;

                }else if(io.contentDocument)
                {
                    xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
                    xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
                }
            }catch(e)
            {
                jQuery.myHandleError(s, xml, null, e);
            }
            if ( xml || isTimeout == "timeout")
            {
                requestDone = true;
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error";
                    // Make sure that the request was successful or notmodified
                    if ( status != "error" )
                    {
                        // process the data (runs the xml through httpData regardless of callback)
                        var data = jQuery.uploadHttpData( xml, s.dataType );
                        // If a local callback was specified, fire it and pass it the data
                        if ( s.success )
                            s.success( data, status );

                        // Fire the global callback
                        if( s.global )
                            jQuery.event.trigger( "ajaxSuccess", [xml, s] );
                    } else
                        jQuery.myHandleError(s, xml, status);
                } catch(e)
                {
                    status = "error";
                    jQuery.myHandleError(s, xml, status, e);
                }

                // The request was completed
                if( s.global )
                    jQuery.event.trigger( "ajaxComplete", [xml, s] );

                // Handle the global AJAX counter
                if ( s.global && ! --jQuery.active )
                    jQuery.event.trigger( "ajaxStop" );

                // Process result
                if ( s.complete )
                    s.complete(xml, status);

                jQuery(io).unbind()

                setTimeout(function()
                {	try
                {
                    jQuery(io).remove();
                    jQuery(form).remove();

                } catch(e)
                {
                    jQuery.myHandleError(s, xml, null, e);
                }

                }, 100)

                xml = null

            }
        }
        // Timeout checker
        if ( s.timeout > 0 )
        {
            setTimeout(function(){
                // Check to see if the request is still happening
                if( !requestDone ) uploadCallback( "timeout" );
            }, s.timeout);
        }
        try
        {

            var form = jQuery('#' + formId);
            jQuery(form).attr('action', s.url);
            jQuery(form).attr('method', 'POST');
            jQuery(form).attr('target', frameId);
            if(form.encoding)
            {
                jQuery(form).attr('encoding', 'multipart/form-data');
            }
            else
            {
                jQuery(form).attr('enctype', 'multipart/form-data');
            }
            jQuery(form).submit();

        } catch(e)
        {
            jQuery.myHandleError(s, xml, null, e);
        }

        jQuery('#' + frameId).load(uploadCallback	);
        return {abort: function () {}};

    },

    uploadHttpData: function( r, type ) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        // If the type is "script", eval it in global context
        if ( type == "script" )
            jQuery.globalEval( data );
        // Get the JavaScript object, if JSON is used.
        if ( type == "json" )
            data = JSON.parse(data);
        // evaluate scripts within html
        if ( type == "html" )
            jQuery("<div>").html(data).evalScripts();
        return data;
    },

    myHandleError: function(s, xml, status, e) {
        //alert("s=" + s + "\n\nresponse=" + xml.responseText + "\n\nstatus=" + status + "\n\nexception=" + e);
        throw e;
    }
});

!function(){
    function fileUpload(){ }

    fileUpload.prototype = {
        add : function(obj){
            var $triggerId = $("#"+obj.fileElementId),
                temp = '<input id="'+obj.fileElementId+'File" style="font-size:50px; *vertical-align:bottom; filter:alpha(opacity=0); opacity:0; position:absolute; z-index:1; top:-10px; right:-10px; cursor:pointer;" type="file" name="file"/>';
            $triggerId.css({"display":"inline-block","position":"relative","overflow":"hidden"}).append(temp);
            $triggerId.click(function(){
                $.ajaxFileUpload(obj);
            });
        }
    }

    lufax.ui.fileUpload = fileUpload;
}(this);