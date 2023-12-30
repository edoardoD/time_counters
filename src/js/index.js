$(document).ready(function () {
    function adjustFooter() {
        var docHeight = $(window).height();
        var footerHeight = $('#footer').outerHeight();
        var footerTop = $('#footer').position().top + footerHeight;

        if (footerTop < docHeight) {
            $('#footer').css('margin-top', 10 + (docHeight - footerTop) + 'px');
        }
    }

    adjustFooter();
    $(window).bind("load", function () { adjustFooter(); });
    $(window).resize(function () { adjustFooter(); });
});