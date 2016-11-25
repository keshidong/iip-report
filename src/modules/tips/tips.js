require('./tips.css');

function tips (str) {
    var html = '<div class="report-tip">' + str + '</div>';
    var $tips = $(html);
    $('body').append($tips);
    window.setTimeout(function () {
        $tips.fadeOut(1000, function () {
            $tips.remove();
        });
    }, 1000);

}
module.exports = tips;


