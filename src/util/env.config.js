var LufaxSite = LufaxSite || {};
var PRD = {
    "site":"http://www." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "",
    "static":"http://static.lufaxcdn.com",
    "statics":"https://static.lufaxcdn.com",
    "common":"http://common." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/common",
    "commons":"https://common." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/common",
    "pl":"http://pl." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/pl",
    "fa":"http://fa." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/fa",
    "list":"http://list." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/list",
    "lists":"https://list." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/list",
    "yeb":"http://yeb." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/yeb",
    "yebs":"https://ljbao." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/yeb",
    "cashier":"http://cashier." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/cashier",
    "trading":"https://trading." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/trading",
    "user":"https://user." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/user",
    "userStatic":"https://user." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/user",
    "fund":"http://fund." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/fund",
    "my":"https://my." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/my",
    "mkt":"http://affiliate." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "",
    "mkts":"https://affiliate." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + ""};

var STG = {
    "site":"http://www.stg.lufax.com",
    "static":"http://static.stg.lufax.com",
    "statics":"https://static.stg.lufax.com",
    "common":"http://common.stg.lufax.com/common",
    "commons":"https://common.stg.lufax.com/common",
    "pl":"http://pl.stg.lufax.com/pl",
    "fa":"http://fa.stg.lufax.com/fa",
    "list":"http://list.stg.lufax.com/list",
    "lists":"https://list.stg.lufax.com/list",
    "yeb":"http://yeb." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/yeb",
    "yebs":"https://ljbao." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/yeb",
    "cashier":"http://cashier." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/cashier",
    "trading":"https://trading.stg.lufax.com/trading",
    "user":"https://user.stg.lufax.com/user",
    "userStatic":"https://user.stg.lufax.com/user",
    "fund":"http://fund.stg.lufax.com/fund",
    "my":"https://my.stg.lufax.com/my",
    "mkt":"http://affiliate.stg.lufax.com",
    "mkts":"https://affiliate.stg.lufax.com"};

var STG1 = {
    "site":"http://wwwtest1." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "",
    "static":"http://statictest1." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "",
    "statics":"https://statictest1." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "",
    "common":"http://commontest1." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/common",
    "commons":"https://commontest1." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/common",
    "pl":"http://pltest1." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/pl",
    "fa":"http://fatest1." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/fa",
    "list":"http://listtest1." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/list",
    "lists":"https://listtest1." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/list",
    "yeb":"http://yeb." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/yeb",
    "yebs":"https://ljbao." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/yeb",
    "cashier":"http://cashier." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/cashier",
    "trading":"https://tradingtest1." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/trading",
    "user":"https://usertest1." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/user",
    "userStatic":"https://usertest1." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/user",
    "fund":"http://fundtest1." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/fund",
    "my":"https://mytest1." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/my",
    "mkt":"http://affiliatetest1." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "",
    "mkts":"https://affiliatetest1." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + ""};


var STG2 = {
    "site":"http://wwwtest2." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "",
    "static":"http://statictest2." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "",
    "statics":"https://statictest2." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "",
    "common":"http://commontest2." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/common",
    "commons":"https://commontest2." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/common",
    "pl":"http://pltest2." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/pl",
    "fa":"http://fatest2." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/fa",
    "list":"http://listtest2." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/list",
    "lists":"https://listtest2." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/list",
    "yeb":"http://yeb." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/yeb",
    "yebs":"https://ljbao." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/yeb",
    "cashier":"http://cashier." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/cashier",
    "trading":"https://tradingtest2." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/trading",
    "user":"https://usertest2." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/user",
    "userStatic":"https://usertest2." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/user",
    "fund":"http://fundtest2." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/fund",
    "my":"https://mytest2." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "/my",
    "mkt":"http://affiliatetest2." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + "",
    "mkts":"https://affiliatetest2." + location.hostname.split(".").slice(location.hostname.split(".").length-2).join(".") + ""};


LufaxSite.Envs = {
    evn:PRD
};
