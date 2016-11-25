var $ = require('jquery');
function login (user, password, fn) {
    $.ajax({
        url: '/Report/Identify',
        data: {
            username: user,
            password: password
        },
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            fn(data[0]['match']);
        }

    });
}

function getLastProfile (fn) {
    var curDate = new Date();
    var day = curDate.getUTCDay();
    curDate.setDate(curDate.getDate() - day + 1);
    var timeStr = curDate.toLocaleDateString().replace(/\//g, '-');
    var timeString = timeStr.substring(2);
    $.ajax({
        url: 'Report/Lastreportproxy',
        data: {
            week: timeString
        },
        dataType: 'text',
        success: function (str) {
            var json = (new Function("return " + str))();
            fn(json);
        }
    });
}

function getCurrentProfile (fn) {
    var curDate = new Date();
    var day = curDate.getUTCDay();
    curDate.setDate(curDate.getDate() + 7 - day + 1);
    var timeStr = curDate.toLocaleDateString().replace(/\//g, '-');
    var timeString = timeStr.substring(2);
    $.ajax({
        url: 'Report/Initialize',
        data: {
            week: timeString
        },
        dataType: 'text',
        success: function (str) {
            var json = (new Function("return " + str))();
            fn(json);
        }
    });
}

function getSession (fn) {
    $.ajax({
        url: 'Report/Getsession',
        type: 'POST',
        success: function (data) {
            // console.log(data);
            fn(data[1]);
        }
    });
}

function history (username, fn) {
    $.ajax({
        url: 'Report/Historyproxy',
        data: {
            user: username,
            page: 1,
            start: 0,
            limit: 99
        },
        dataType: 'text',
        success: function (str) {
            var json = (new Function("return " + str))();
            fn(json);
        }
    });
}

function reportdetail(username, date, fn) {
    $.ajax({
        url: 'Report/Detail',
        type: 'POST',
        data: {
            name: username,
            week: date
        },
        dataType: 'json',
        success: function (data) {
            fn(data[0]);
        }
    });
}

// 存储时间
var curDate = new Date();
var day = curDate.getUTCDay();
curDate.setDate(curDate.getDate() - day + 1);
var timeStr1 = curDate.toLocaleDateString().replace(/\//g, '-');
curDate.setDate(curDate.getDate() + 7);
var timeStr2 = curDate.toLocaleDateString().replace(/\//g, '-');

module.exports = {
    login: login,
    getLastProfile: getLastProfile,
    getCurrentProfile: getCurrentProfile,
    getSession: getSession,
    lastWeek: timeStr1,
    currentWeek: timeStr2,
    history: history,
    reportdetail: reportdetail
}