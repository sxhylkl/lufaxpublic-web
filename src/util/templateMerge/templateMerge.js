/**
 * depends: jquery,template.js
 * author: huangjunyan
 * date: 2014/8/12
 */
!function (window) {
    /**
     * @class templateMerge
     * @constructor templateMerge
     */

        var TemplateMerge ={
            _escapeTemplate: function (content) {
                return content == null ? "" : content.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
            },
            stringTemplateMergeAndShow: function (template, data, callback) {
                var mergedTemplate = TrimPath.parseTemplate(this._escapeTemplate(template), 'templateId').process({model: data});
                if (callback)
                    callback(mergedTemplate);
                return mergedTemplate;
            },
            textareaTemplateMergeAndShow: function (templateId, data, callback) {
                var mergedTemplate = TrimPath.processDOMTemplate(templateId, {model: data});
                if (callback)
                    callback(mergedTemplate);
                return mergedTemplate;
            }
        }

    lufax.util.TemplateMerge = TemplateMerge;
    lufax.templateMerge = lufax.util.TemplateMerge;
}(this);