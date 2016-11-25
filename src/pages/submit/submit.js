var $ = require('jquery');
var model = require('model');
var template = require('template');
require('./submit.css');
var html = require('./submit.html');
$('body').append(html);

var lastWeek = new Date(model.lastWeek);
var lastStr = '上周：' + new Date(lastWeek - 7*24*3600*1000).toLocaleDateString().replace(/\//g, '-') + '~' + model.lastWeek;

var currentWeek = new Date(model.currentWeek);
var currentStr = '本周：' + model.lastWeek + '~' + model.currentWeek;

$('#submit-lastweek').text(lastStr);
$('#submit-lastweek').val(model.lastWeek.substring(2));
$('#submit-currentweek').text(currentStr);
$('#submit-currentweek').val(model.currentWeek.substring(2));

$('.submit-textarea').on('input', function () {
    var $note = $(this).next();
    var wordNum = $(this).val().length;
    if (wordNum >= 70) {
        $note.text('');
    } else {
        $note.text('还差' + (70 - wordNum) + '个字！');
    }
});

function editable(data) {
    // if (data)
}

function noedit(data) {

}

$(document).on('afterSession', '#submit', function() {

    if (model.comefrom) {
        $('#submit-select').val(model.comefrom.date);
        $( '#submit-select').selectmenu( 'refresh');
        model.comefrom = null;
    }

    model.reportdetail(model.userInfo.userName, $('#submit-select').val(), function (data) {
        // if (data)
    });
    // var htmlcurrent = template('tpl-submitsel', {
    //     isSelect: 'selected'
    // });
    // document.getElementById('tpl-selcont').innerHTML = htmlcurrent;

});

$('#submit-btn').tap(function () {
    console.log(111)
})