$(function(){
    $titles = $('#introtext .slide');
    var timestamps = [],
        now = 0,
        old = 0;

    // reset scroll on load
    $('html, body').scrollTop(0);

    // build timestamps
    $titles.each(function(o) {
        if ($(this).attr('data-start')) {
            timestamps.push({
                start: +$(this).attr('data-start'),
                end: +$(this).attr('data-end'),
                elm: $(this)
            });
        }
    });

    $('video').bind('timeupdate', function(event) {
        now = parseInt(this.currentTime);
        if (now > old) showsection(now);
        old = now;
    });

    function showsection(t) {
        for (var i = 0; i < timestamps.length; i++) {
            if (t >= timestamps[i].start && t <= timestamps[i].end) {
                timestamps[i].elm.addClass('current');
            } else {
                timestamps[i].elm.removeClass('current');
            }
        }
    };

    $('video').bind('ended, click', function(event){
        $('body').removeClass('locked');
        this.muted=true;
        this.pause();
        $('#intro-overlay').addClass('visible');
        $('html, body').animate({
            scrollTop:$('#home').offset().top
        }, 'slow');
    })

    
})