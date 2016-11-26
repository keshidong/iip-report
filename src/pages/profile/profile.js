var $ = require('jquery');
var model = require('model');
var template = require('template');

require('./profile.css');
var html = require('./profile.html');

$('body').append(html);

$('#profile-lastweek-title').text('上周：' + model.lastWeek);
$('#profile-currentweek-title').text('本周：' + model.currentWeek);

$(document).on('afterSession', '#profile', function() {
    model.getLastProfile(function (data) {
        var htmlLast = template('tpl-lastweek', data);
        document.getElementById('content-lastweek').innerHTML = htmlLast;
    });
    model.getCurrentProfile(function (data) {
        var htmlcurrent = template('tpl-currentweek', data);
        document.getElementById('content-currentweek').innerHTML = htmlcurrent;
    });
});