require('./history.css');
var $ = require('jquery');
var template = require('template');
var model = require('model');
var tips = require('modulesPath/tips/tips.js');

var html = require('./history.html');
$('body').append(html);

$(document).on('afterSession', '#history',function() { //当进入history页面时
    model.history(model.userInfo.userName, function (data) {
        var htmlLast = template('history-list', data);
        document.getElementById('history-contlist').innerHTML = htmlLast;
    });
});

// model.reportdetail('柯诗栋', '16-12-05', function (data) {
//     console.log(data)
// });

$('#history-contlist').on('tap', '.look-edit.reportlook-btn', function (event) {
    event.stopPropagation();

    var date = $(this).data('reportdate');
    var username = model.userInfo.userName;
    model.reportdetail(username, date, function (data) {
        $('[node-type="history-date"]').text(date);
        $('[node-type="history-checkman"]').text(data.reviewer);
        $('#content-summary .history-textarea').val(data.content);
        $('#opinion-check .history-textarea').val(data.reviewContent);
        $('#popupDlg').popup('open');

        $('#content-ckecktab').removeClass('ui-btn-active')
        $('#content-summarytab').addClass('ui-btn-active');
        $('#content-summarytab')[0].click();

    });

    return false;
});

$('#history-contlist').on('tap', '.look-edit.reportedit-btn', function (event) {
     event.stopPropagation();

     model.comefrom = {
         'target': 'history',
         'date': $(this).data('reportdate')
     };

     $.mobile.changePage('#submit');
     return false;
});