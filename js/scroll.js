$(function() {
    const $line1 = $('#mountain1'),
        $line2 = $('#mountain2'),
        $line3 = $('#mountain3');

    const $mountains = $('.mountain'),
        $scroll = $('#scroll');

    $mountains.on('scroll', function(e){
        
        e.stopPropagation();
        var $this = $(this);
        
        let $siblings = $this.siblings();
        var this_factor = parseFloat($this.attr('data-factor'));
        var sl = $this.scrollLeft();
        var this_id = $this.attr('id');
        var this_index = parseInt(this_id);
        var this_ishover = $('#' + this_id + ':hover');

        $siblings.each(function(j){
            var factor = parseFloat($(this).attr('data-factor'));
            if (j != this_index && this_ishover.length ) {
                $(this).scrollLeft( sl * factor / this_factor);
            }
        })
    })


    var isDragging = false;
    var startingPos = [];
    $mountains
        .mousedown(function (evt) {
            isDragging = false;
            startingPos = [evt.pageX, evt.pageY];
        })
        .mousemove(function (evt) {
            if (!(evt.pageX === startingPos[0] && evt.pageY === startingPos[1])) {
                isDragging = true;
            }
        })
        .mouseup(function () {
            if (isDragging) {
                // console.log("Drag");
            } else {
                var className = $(this).attr('id')+'-active';

                if ($scroll.hasClass(className)) {
                    $scroll.removeClass(className);
                } else {
                    $scroll.removeClass();
                    $scroll.addClass(className);
                }

                var this_id = $(this).attr('id');

                setTimeout(backhome.bind(null, this_id), 500)
            }
            isDragging = false;
            startingPos = [];
        });

        
    // $mountains.on('click', function(e){
        
        
    // })

    backhome = function(this_id){
        var top = $('#' + this_id).offset().top + $('#home').scrollTop()
        // $('#home').animate({
        //     scrollTop: top
        // }, 'slow');
    }


});