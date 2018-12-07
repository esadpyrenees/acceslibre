$(function(){
    

    /* ------------------------------------------------------------
    ---------------------------------------------------------------
    Skrollr
    ---------------------------------------------------------------
    -------------------------------------------------------------*/ 

    var skrollrinit = true;
    var sk = skrollr.init({
        // forceHeight:false,
        constants: {
            offsetstart: function() {
                var val = $(document).height() - $(window).height() 
                if (skrollrinit) {
                    skrollrinit = false;
                    val = val / 2
                }
                return val;
            },
            offsetend: function() {
                return $(document).height() + 500 ;
            }
        }
    });


    /* ------------------------------------------------------------
    ---------------------------------------------------------------
    Texte
    ---------------------------------------------------------------
    -------------------------------------------------------------*/ 

    var texte = {
        limit: window.innerHeight / 2,
        check_interval: null,
        init: function(el_id){

            clearInterval(texte.check_interval);
            
            var images_refs = [],
                aside_images = [],
                el = document.querySelector(el_id);
                images = el.querySelectorAll('.texte img'),
                aside = document.querySelector('#aside');

            aside.classList.add('hidden');
            aside.innerHTML = '';

            images.forEach( function(image, index) {
                var span =  document.createElement('span');
                span.setAttribute('rel', index);
                span.className="ref";
                //ajout du span à la liste des éléments références
                images_refs.push(span);
                // insertion de l’élément référence dans le DOM avant l’image
                image.parentNode.insertBefore(span, image)
                
                
                // déplacement de l’image vers aside
                // on crée une figure pour mettre l’image ET la légende
                var figure = document.createElement('figure');
                var figcaption = document.createElement('figcaption');
                figcaption.innerHTML = image.getAttribute('alt');
                figure.appendChild(image.cloneNode());
                figure.appendChild(figcaption);

                aside.appendChild(figure);
                // stockage de l’image dans la liste
                aside_images.push(figure);

                // on caceh l’image originale
                image.style.display='none';
            });
            
            // check des images dans le viewport
            texte.check_interval = setInterval(function(){
                for (var i = 0; i < images_refs.length; i++) {

                    var span = images_refs[i];
                    var idx = span.getAttribute('rel');
              
                    if(isElementInViewport(span, texte.limit) ){
                        aside_images.forEach( function(element, index) {
                            element.classList.remove('visible');
                        });
                        aside_images[idx].classList.add('visible');
                    } else {
                        aside_images[idx].classList.remove('visible');
                    }
                }
            }, 50)
        },
        destroy: function(){
            var aside = document.querySelector('#aside');

            aside.innerHTML = '';
            clearInterval(texte.check_interval);

        }
    }        
    


    /* ------------------------------------------------------------
    ---------------------------------------------------------------
    Audio
    ---------------------------------------------------------------
    -------------------------------------------------------------*/ 

    var audio = {
        element: document.querySelector('#audio'),
        button: document.querySelector('#audioplayerbutton'),
        textcontainer: document.querySelector('#audioplayertextcontainer'),
        texte: document.querySelector('#audioplayertext'),
        init:function(){
            audio.button.addEventListener('click', function(e){
                if (audio.element.paused) {
                    this.className='playing';
                    audio.element.play();
                } else {
                    this.className='paused';
                    audio.element.pause();
                }
            })
        },

        newaudio: function(mp3, textelement){
            audio.element.pause();
            audio.element.setAttribute('src', mp3 );
            audio.element.addEventListener('canplaythrough', function() { 
                console.log('canplaythrough')
                audio.button.classList.add('playing');
                audio.button.classList.remove('paused');
                audio.element.play();
            }, false);
            audio.element.addEventListener('ended', function() { 
               audio.element.setAttribute('src', "" );
            }, false);
            
            var txt = textelement.text();
            audio.textcontainer.classList.remove('marquee');
            audio.texte.innerHTML = txt;
            void audio.textcontainer.offsetWidth; // trick : https://css-tricks.com/restart-css-animation/
            audio.textcontainer.classList.add('marquee');

            audio.textcontainer.style.animationDuration = txt.length * 250; // magick number
        },
        destroy:function(){
            audio.element.setAttribute('src', "" );
            audio.texte.innerHTML = "";
        },
        pause:function(){
            audio.element.pause();
            audio.button.classList.remove('playing');
            audio.button.classList.add('paused');
        }
    }

    audio.init();


    /* ------------------------------------------------------------
    ---------------------------------------------------------------
    Audio
    ---------------------------------------------------------------
    -------------------------------------------------------------*/ 

    var video = {
        player: null,

        newvideo: function(element){

            video.player = new Plyr('#player-' + element);
            video.player.on('play', event => {
                const instance = event.detail.plyr;
                if (audio.element) {
                    audio.element.pause();
                }
            })
        },
        destroy:function(){
            if(video.player) {
                video.player.pause();
                video.player.destroy();
            }
        }
    }



    /* ------------------------------------------------------------
    ---------------------------------------------------------------
    Navigation
    ---------------------------------------------------------------
    -------------------------------------------------------------*/ 

    // liens navigation principale
    $('.contentlink').on('click', function(e){
        e.stopPropagation();
        e.preventDefault();
        var $this = $(this),
            type = $this.attr('data-type'),
            href = $this.attr('href'),
            $target = $(href);

        // cas de l’audio

        if (type == "audio") {
            audio.newaudio( $this.attr('data-mp3'), $this.find('.audioinfo'));
            return false;
        }

        if (type == "texte") {
            texte.init(href);
        } else {
            texte.destroy();
        }


        if (type == "video") {
            video.destroy();
            video.newvideo(href.replace('#', ''));
        } else {
            video.destroy();
        }

        // cas des pages texte ou video

        
        var $is_article_visible = $('article.visible');
        $is_article_visible.addClass('hidden');

        $('#skrollr-body').animate({
            scrollTop: 0
        }, 'slow', function(){

            $('html, body').animate({
                scrollTop: $('#skrollr-body').offset().top
            }, 'slow', function(){

                $target.slideDown('fast', function() {
                    $('#aside, #content').removeClass('hidden');
                    
                    $(this).removeClass('hidden');

                    $(this).addClass('visible');
                    sk.refresh();
                    
                });   
            });
        });
        
    });



    // responsive video

    $('iframe').wrap('<div class="videoWrapper"></div>');
    
})