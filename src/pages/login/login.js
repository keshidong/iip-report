require('./login.css');
var $ = require('jquery');
var model = require('model');
var tips = require('modulesPath/tips/tips.js');

var html = require('./login.html');
$('body').append(html);

$('.login-btn').tap(function () {
    var username = $('#user-name').val();
    var password = $('#password').val();
    if (!username || !password) {
        tips('用户名和密码不能为空！');
        return;
    }
    model.login(username, password, function (isLogin) {
        if (isLogin) {
            $.mobile.changePage("#profile");
        } else {
            tips('用户名或密码错误！');
        }

    });
});

