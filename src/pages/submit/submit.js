var $ = require('jquery');
var model = require('model');
var template = require('template');
var tips = require('modulesPath/tips/tips.js');
require('./submit.css');
var html = require('./submit.html');
$('body').append(html);

var lastWeek = new Date(model.lastWeek);
var lastStr = '上周：' + model.lastlastWeek + '~' + model.lastWeek;

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

function reset(str) { // str: 提交， 修改， 已审核
    var editmap = {
        '提交': 0,
        '修改': 1,
        '已审核': 2
    };
    var $submitbtn =  $('#submit-btn');
    $('#submit-thisweektab')[0].click();
    $('#submit-nextweektab').removeClass('ui-btn-active');
    $('#submit-thisweektab').addClass('ui-btn-active');
    $submitbtn.text(str);
    $submitbtn.data('editable', editmap[str]);
    $submitbtn.disabled = false;
    $('#submit-editarea textarea').readonly = false;
    if (editmap[str] === 2) {
        $('#submit-editarea textarea').readonly = true;
        $submitbtn.text('已审核');
        $submitbtn.disabled = true;
    } else if (editmap[str] === 1) {
        $submitbtn.text('修改');
    } else if (editmap[str] === 0) {
        $('#textarea1').val('');
        $('#textarea2').val('');
        $submitbtn.text('提交');
    }
}
function editable(username, dateweek) {
     model.reportdetail(username, dateweek, function (data) {
         if (!data.reviewStatus) { // data.reviewStatus is undefined, 没有提交过内容
             reset('提交');
         } else {
             var content = data.content;
             var index1 = content.search(/本周工作:/);
             var index2 = content.search(/下周计划:/);
             var p1 = content.substring(index1 + 6, index2 - 1);
             var p2 = content.substring(index2 + 6);
             $('#textarea1').val(p1);
             $('#textarea2').val(p2);

             if (data.reviewStatus === '未审核') {
                 reset('修改');
             } else if (data.reviewStatus === '已审核') {
                 reset('已审核');
             }
         }
     });
}

$(document).on('afterSession', '#submit', function() {

    if (model.comefrom) {
        $('#submit-select').val(model.comefrom.date);
        $( '#submit-select').selectmenu( 'refresh');
        model.comefrom = null;
    }

    editable(model.userInfo.userName, $('#submit-select').val());
});

$('#submit-select').change(function () {
    editable(model.userInfo.userName, $(this).val());
});
$('#submit-btn').tap(function (event) {
    event.stopPropagation();

    var username = model.userInfo.userName;
    var p1 = $('#textarea1').val();
    var p2 = $('#textarea2').val();

    if (p1.length <= 70 || p2.length <= 70) {
        tips('字数不足70字！');
        return;
    }

    if ($(this).data('editable') === 1) {
        $('#submit-editt').text('修改');
    } else {
        $('#submit-editt').text('提交');
    }
    $('#submit-editm').text(username);

    $('#submit-sure').popup('open');
    $('#submit-editw').text($("#submit-select").find("option:selected").text());

    return false;
});

$('#sumit-surecancel').tap(function () {
    $('#submit-sure').popup('close');
});

$('#sumit-sureok').tap(function () {

    var p1 = $('#textarea1').val();
    var p2 = $('#textarea2').val();

    var username = model.userInfo.userName;
    var dateweek = $('#submit-select').val();

    var to = $("#submit-select").find("option:selected").text();
    var subject = '工作总结-' + dateweek + '-' + username;
    var msg = '本周工作:' + '\n' + p1 + '\n' + '下周计划:' + '\n' +  p2;

    if ($('#submit-btn').data('editable') === 0) {
        model.sendreport(to, subject, p1, p2, function (data) {
            if (data.success && data.allow) {
                tips('报告提交成功');
                $('#submit-sure').popup('close');
                setTimeout(function () {
                    $.mobile.changePage('#profile');
                }, 1000);
            }
        });
    } else if ($('#submit-btn').data('editable') === 1) {
        model.updatereport(username, dateweek, subject, msg, function (data) {
            tips('报告修改成功');
            $('#submit-sure').popup('close');
            setTimeout(function () {
            $.mobile.changePage('#profile');
            }, 1000);
        });
    }

});