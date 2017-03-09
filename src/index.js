var model = require('model');
var $ = require('jquery');
var panel = require('./modules/panel/panel.js');
$(document).one('pagebeforecreate', function () {
    $.mobile.pageContainer.prepend(panel);
    $("#panel").panel().enhanceWithin();
});

$(document).on('pagebeforeshow', function () {
    var pageid = $.mobile.activePage.attr('id');
    model.getSession(function (data) {
        if (data) {
            model.userInfo = data;
            console.log(data)
            $('#' + pageid).trigger('afterSession');
            // 登录页跳转
            if (pageid === 'login') {
                $.mobile.changePage('#profile');
            }
        } else {
            $.mobile.changePage('#login');
        }
    });
});
