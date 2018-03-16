!function(){
    function ActivationLufaxCoin(){

    }

    ActivationLufaxCoin.prototype = {
        template: '<iframe id="activationLufaxCoinFrame" src="$protocol//affiliate.' + location.hostname.substring(location.hostname.indexOf('.') + 1) + '/lufaxcoin/activate-code?callback=ActivationLufaxCoinAsync" scrolling="no" frameborder="0" width="526" height="225"></iframe>',

        pop: function(){
            var me = this;
            me.template = me.template.replace("$protocol",location.protocol);

            LufaxPopup.blankPopup({
                content:
                    '<div class="modal-content">' +
                        '<div class="modal-header clearfix">' +
                            '<div class="close"><a class="modal-close" href="javascript:;"></a></div>' +
                            '<h4 class="modal-title">激活新的陆金币</h4>' +
                        '</div>' +
                        me.template +
                    '</div>',
                onConfirm:function () { }
            });
        },

        map: function(){
            var me = this;
            return {
                /*close*/
                "01":function(){
                    LufaxPopup.close();
                },
                /*success*/
                "02":function(data){
                    me.onSuccess && me.onSuccess(data);
                },
                "03":function(){
                    location.href = "https://user." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/user/login?returnPostURL=" + encodeURIComponent(location.href);
                },
                "99":function(){
                    location.href = "http://www." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/error.html";
                }
            }
        }
    }
    lufax.com.ActivationLufaxCoin = new ActivationLufaxCoin();
}(this);
function ActivationLufaxCoinAsync(data){
    lufax.com.ActivationLufaxCoin.map()[data.result](data);
}