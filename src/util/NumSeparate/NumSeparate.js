/**
 * depends: jquery
 * author: wangdongqiang334
 * date: 2014/7/3
 */

/**
 *功能：格式化手机号，身份证号，银行卡号
 *@method NumSeparate init
 *@param {Dom} triggerDom：输入框id，或class
 *@param {String} type：格式化类型{"01":"mobile", "02":"IDCard", "03":"bankCard"}
 */

!function(){
    /**
     * @class NumSeparate
     * @constructor NumSeparate
     */
    function NumSeparate(data){

    }

    NumSeparate.prototype = {
        init:function(triggerDom,type){
            var me = this,
                inputVal ='',
                formatted = '';

            $(triggerDom).keyup(function(){
                inputVal = $(this).val().replace(/\s/g,"");
                formatted = me.format(inputVal,type);
                $(this).val(formatted);
            });
        },

        format:function(data,type){
            var _data = '';

            switch (type){
                case "01":          //"01":"mobile"
                    _data = data.substr(0,3)+" "+data.substr(3,4)+" "+data.substr(7);
                    break;
                case "02":          //"02":"IDCard"
                    _data = data.substr(0,6)+" "+data.substr(6,8)+" "+data.substr(14);
                    break;
                case "03":          //"03":"bankCard"
                    _data = data.replace(/\s/g,'').replace(/(\d{4})/g,"$1 ");
                    break;
            }
            return $.trim(_data);
        }
    }

    lufax.util.NumSeparate = NumSeparate;
    lufax.util.NumSeparate = new NumSeparate();
    lufax.NumSeparate = lufax.util.NumSeparate;
}(this);