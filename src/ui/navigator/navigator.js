!function(){
    function Navigator (){

    }
    Navigator.prototype = {
        args:{},

        init:function(){
            var me = this,
                url_nav_data = top.location.protocol+"//www." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/list/service/product/counts-info?jsoncallback=?";

            me._locationNav();
            me._showNavData(url_nav_data);
        },

        _showNavData:function(url){
            var me = this,
                _dataMap = {
                    newUserProductCounts : "#nav-newUser",
                    totalTransferProductCounts: "#nav-transfer",
                    licaiProductCounts: "#nav-allLicai",
                    piaojuProductCounts: "#nav-piaoju",
                    normalLicaiProductCounts: "#nav-zhuanxinglicai",
                    zhujiangProductCounts: "#nav-zhujiang",
                    anyedaiProductCounts: "#nav-anye",
                    countsOfInvestChannel: "#nav-anyi",
                    fuyingProductCounts: "#nav-fuying",
                    totalCountsOfInvestChannel: "#nav-touzipindao",
                    luWalletProductCounts:"#nav-linghuobao"
                };

            $.getJSON(url,function (data) {
                if (data.result !== "false") {
                    me.args = data;
                    
                    for(var i in _dataMap){
                        var count = data[i];
                        if(count !=0 && count != undefined){
                            count = count > 99 ? "99+" : count;
                            $(_dataMap[i]).html(count);
                            $(_dataMap[i]).parent("span").show();
                        }
                    }
                }
                window._set_other_counts && window._set_other_counts(data);
            });
        },

        _locationNav:function(){
            var page = $("#current-page").val(),
                $mainNav = $(".lufax-navigator");
            switch (page) {
                case "nav-home":
                    $("."+page).addClass("selected");
                    break;
                case "invest":
                    $(".nav-invest").addClass("selected");
                    break;
                case "licai":
                    $(".nav-licai").addClass("selected");
                    break;
                case "about":
                    $(".nav-about").addClass("selected");
                    break;
                case "transfer":
                    $(".nav-transfer").addClass("selected");
                    break;
                case "xinke":
                    $(".nav-xinke").addClass("selected");
                    break;
                case "loan":
                    $(".nav-loan-channel").addClass("selected");
                    break;
                case "login":
                    $mainNav.hide();
                    break;
                case "recharge":
                    $mainNav.hide();
                    break;
                case "withdraw":
                    $mainNav.hide();
                    break;
                case "investment-detail":
                    $mainNav.hide();
                    break;
                case "my-account":
                    $mainNav.hide();
                    break;
                case "investment":
                    $mainNav.hide();
                    break;
                case "transfer-request":
                    $mainNav.hide();
                    break;
                case "sme":
                    $mainNav.hide();
                    break;
            }
        }
    }

    lufax.navigator = new Navigator();
}(this);

$(function(){
    lufax.navigator.init();
});