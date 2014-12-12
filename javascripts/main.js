$(function() {

    var t1Vibrancy = $('.target-1').vibrancy({
        panelClass: 'panel',
        backgroundSrc: $('.thumbs-1 img:first-child').attr('src')
    }).data('vibrancy');

    // Thumbnails
    $('.thumbs-1 img').on('mousedown touchstart', function(e) {

        var $img = $(this);
        if ($img.hasClass('active')) {
            return;
        }

        $('.thumbs-1 img').removeClass('active');
        $(this).addClass('active');

        var numVibs = t1Vibrancy.vibObjects.length;
        $.each(t1Vibrancy.vibObjects, function(i, o) {
            o.canvas.stop(true, false).fadeOut(100, function() {
                numVibs--;
                if (numVibs === 0) {
                    t1Vibrancy.loadBackground($img.attr('src'));
                }
            });
        });
    });

});
