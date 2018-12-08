$(function(){

    // TZZZ

    function changeIntro() {

        var texts = [
            'Découvrez les coulisses du festival accès)s( #18',
            'Si rien ne se passe, continuez à scroller',
            'Un média numérique autour du festival accès)s( #18',
            'Un workshop sous <i>caféine</i>',
            'Un paysage de fictions',
            'Fond vert power',
            'Essayer encore, rater encore, rater mieux',
            'WOAW! World open acces)s( web',
            'Méthodologie, gestion de projet : ✓'
        ]
        var randtext = texts[Math.floor(Math.random() * texts.length)];

        $('#intro_libre_acces').html(randtext);
    }

    
    


    // loop with random delay
    (function loop() {
        var rand = Math.round(Math.random() * 5000 ) + 5000;
        setTimeout(function() {
                changeIntro();
                loop();  
        }, rand);
    }());

    /* ------------------------------------------------------------
    ---------------------------------------------------------------
    Skrollr
    ---------------------------------------------------------------
    -------------------------------------------------------------*/
    var vw = $(window).width();
    var skrollrinit = true;


    if(vw>450){
        var sk = skrollr.init({
            // forceHeight:false,
            constants: {
                offsetstart: function() {
                    var val = $(document).height() - $(window).height();
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
    }



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
                        span.style.backgroundColor = 'blue'
                        aside_images.forEach( function(element, index) {
                            element.classList.remove('visible');
                        });
                        aside_images[idx].classList.add('visible');
                    } else {
                        span.style.backgroundColor = 'black'
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
            document.querySelector('#audioplayer').className='';
            audio.element.setAttribute('preload', 'auto');
            audio.element.setAttribute('src', mp3 );
            audio.element.load();
            audio.element.addEventListener('canplaythrough', function() {
                console.log('canplaythrough');
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
    Vidéo
    ---------------------------------------------------------------
    -------------------------------------------------------------*/

    var video = {
        player: null,

        new: function(href){
            var id = '#player-' + href.replace('#', '');

            video.player = new Plyr(id);

            video.player.on('play', event => {
                const instance = event.detail.plyr;
                if (audio.element) {
                    audio.element.pause();
                }
            })
        },

        destroy:function(){
            if(video.player != null) {
                video.player.pause();
                video.player.destroy();
            }
        }
    }

    /* ------------------------------------------------------------
    ---------------------------------------------------------------
    Gallery
    ---------------------------------------------------------------
    -------------------------------------------------------------*/

    var gallery = {
        owl: null,

        new: function(href){

            var id = href + '-gallery';
            console.log(id)
            $(id).owlCarousel({
                items:1,
                loop:true,
                dots:false,
                nav:true
            });

        },

        destroy:function(){
            if(gallery.owl != null) {
                // gallery.owl.destroy();
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
            has_gallery = $this.attr('data-gallery') ? true : false,
            href = $this.attr('href'),
            $target = $(href);

        // cas de la vidéo
        if (type == "video") {
            video.destroy();
            video.new( href );
        } else {
            video.destroy();
        }

        console.log('has_gallery ' + has_gallery)
        // cas d’une galerie
        if (has_gallery) {

            gallery.destroy();
            gallery.new( href );
        } else {
            gallery.destroy();
        }

        // cas de l’audio
        if (type == "audio") {
            audio.newaudio( $this.attr('data-mp3'), $this.find('.audioinfo') );
            return false;
        }

        // cas du texte
        if (type == "texte") {
            texte.init( href );
        } else {
            texte.destroy();
        }




        // cas des pages texte ou video


        var $is_article_visible = $('article.visible');
        $is_article_visible.addClass('hidden');
        $is_article_visible.css('display', 'none');

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
