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
function formatDateweek(date) {
    function pad(n) {return n < 10 ? "0" + n : n;}
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
}

function getLastweekDate() {
    var curDate = new Date();
    var day = curDate.getUTCDay() || 7;
    curDate.setDate(curDate.getDate() - day + 1);
    var timeStr = formatDateweek(curDate);
    return timeStr;
}

function getLastLastweekDate() {
    var date = new Date(getLastweekDate());
    return formatDateweek(new Date(date - 7*24*3600*1000));
}

function getCurrentweekDate() {
    var curDate = new Date();
    var day = curDate.getUTCDay() || 7;
    curDate.setDate(curDate.getDate() + 7 - day + 1);
    var timeStr = formatDateweek(curDate);
    return timeStr;
}

function getLastProfile (fn) {
    var timeString = getLastweekDate().substring(2);
    $.ajax({
        url: '/Report/Lastreportproxy',
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
    var timeString = getCurrentweekDate().substring(2);
    $.ajax({
        url: '/Report/Initialize',
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
        url: '/Report/Getsession',
        type: 'POST',
        success: function (data) {
            // console.log(data);
            fn(data[1]);
        }
    });
}

function history (username, fn) {
    $.ajax({
        url: '/Report/Historyproxy',
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
        url: '/Report/Detail',
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

function sendreport(to, subject, week_msg, next_msg, fn) {
    var formData = new FormData();
    formData.append('to', to);
    formData.append('subject', subject);
    formData.append('week_msg', week_msg);
    formData.append('next_msg', next_msg);
    formData.append('file-path', '');

    $.ajax({
        url: '/Report/SendReport',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'text',
        success: function (str) {
            var json = (new Function("return " + str))();
            fn(json);
        }
    });
}

function updatereport(user, week, subject, msg, fn) {
    $.ajax({
        url: '/Report/Updatereport',
        data: {
            week: week,
            subject: subject,
            msg: msg,
            user: user
        },
        dataType: 'text',
        success: function (str) {
            var json = (new Function("return " + str))();
            fn(json);
        }
    });
}

module.exports = {
    login: login,
    getLastProfile: getLastProfile,
    getCurrentProfile: getCurrentProfile,
    getSession: getSession,
    lastWeek: getLastweekDate(),
    currentWeek: getCurrentweekDate(),
    lastlastWeek: getLastLastweekDate(),
    history: history,
    reportdetail: reportdetail,
    sendreport: sendreport,
    updatereport: updatereport
}