//ga
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-39051185-1']);
_gaq.push(['_setDomainName', 'lufax.com']);
_gaq.push(['_trackPageview']);

var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);

//bd hm
var hm = document.createElement("script");
hm.type = 'text/javascript';
hm.async = true;
hm.src = ("https:" == document.location.protocol ? " https:" : " http:") + "//hm.baidu.com/hm.js?9842c7dcbbff3109ea37b7407dd0e95c";
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(hm, s);

//bd cpro
if (typeof getCookie == "function") {
    var cookieName = getCookie("_tn");
    if (!cookieName) {
        var bd = document.createElement('script');
        bd.type = 'text/javascript';
        bd.async = true;
        bd.src = ('https:' == document.location.protocol ? 'https://static.lufaxcdn.com' : 'http://static.lufaxcdn.com') + '/config/js/baidu/bd.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(bd, s);
    }
}