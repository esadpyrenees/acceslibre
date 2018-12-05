
window.onbeforeunload = function(){ window.scrollTo(0,0); }


    var timestamps = [],
        now = 0,
        old = 0,
        init = true;

    var titles = document.querySelectorAll('.slide'),
        video = document.querySelector('video'),
        wrapper = document.querySelector('#video'),
        overlay = document.querySelector('#intro-overlay'),
        button = document.querySelector('#replay');


    // reset scroll on load
    window.scrollTo(0,0); 

    // build timestamps
    titles.forEach( function(element, index) {
        if (element.getAttribute('data-start') != "") {
            timestamps.push({
                start: +element.getAttribute('data-start'),
                end: +element.getAttribute('data-end'),
                elm: element
            });
        }
    });
    

    setTimeout(function(){
        if(autoplay){                   
            wrapper.classList.add('autoplay');
        }
    }, 150);

    video.addEventListener('timeupdate', function(event) {
        now = parseInt(this.currentTime);
        if (now > old) showsection(now);
        old = now;
    });

    function playVideo(){
        wrapper.classList.add('playing');
        video.muted=false;
        video.play();
        overlay.classList.remove('visible');
        overlay.classList.remove('start');
        init = false;    
        button.classList.remove('play');
    
    }

    button.addEventListener('click', function(e){
        e.stopPropagation();
        if (!video.paused) {
            switchToHome();
        } else {
            playVideo();
        }
    })

    function showsection(t) {
        for (var i = 0; i < timestamps.length; i++) {
            if (t >= timestamps[i].start && t <= timestamps[i].end) {
                timestamps[i].elm.classList.add('current');
            } else {
                timestamps[i].elm.classList.remove('current');
            }
        }
    };


    video.addEventListener('ended', function(event){
        switchToHome();  
    })

    overlay.addEventListener('click', function(){
        if (init)  playVideo();
        // else switchToHome();  
    })

    video.addEventListener('click', function(event){
        if (init)  playVideo();
        else switchToHome();  
    })

    function switchToHome(){
        document.body.classList.remove('locked');
        wrapper.classList.remove('playing');
        video.muted=true;
        video.pause();
        overlay.classList.add('visible');
        setTimeout(function(){
            button.classList.add('play');
        }, 500)
        $('html, body').animate({
            scrollTop:$('#skrollr-body').offset().top
        }, 'slow');
    }
    
$(function(){})