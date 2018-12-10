
// remonter en haut de page au rechergement
window.onbeforeunload = function(){ window.scrollTo(0,0); }


var timestamps = [],
    now = 0,
    old = 0,
    init = true;

var titles = document.querySelectorAll('.slide'),
    video = document.querySelector('video'),
    wrapper = document.querySelector('#video'),
    overlay = document.querySelector('#intro-overlay'),
    button = document.querySelector('#introbutton');


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
        if (window.location.search == "") {
            playVideo();
        }
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
    setTimeout(function(){
        button.classList.add('skip');
        button.classList.remove('replay');
    }, 3000)

}

button.addEventListener('click', function(e){
    e.stopPropagation();
    if (!video.paused) {
        switchToHome();
    } else {
        playVideo();
    }
    if (this.className=='replay') {
        this.classList.remove('replay');
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
    video.currentTime = 0;
    showsection(0);
    overlay.classList.add('visible');
    button.classList.remove('skip');
    setTimeout(function(){
        button.classList.add('replay');
    }, 1500);
    $('html, body').animate({
        scrollTop:$('#skrollr-body').offset().top
    }, 'slow');
}

