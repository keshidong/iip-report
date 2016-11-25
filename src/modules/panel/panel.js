var html = require('./panel.html');
var model = require('model');

$(document).on( "panelbeforeopen", function (event) {
    $('.panel-list').removeClass('ui-btn-active');
    $('.panel-' + $.mobile.activePage.attr('id')).addClass('ui-btn-active');

    document.getElementById('panel-user-name').innerHTML = model.userInfo.userName;
});

module.exports = html;