$(function(){

    // Texte d’introduction aléatoire

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
            'Une approche documentaire, des regards singuliers',
            'Méthodologie, gestion de projet : ~<br> Deadline respectée : ✓'
        ]
        var randtext = texts[Math.floor(Math.random() * texts.length)];

        $('#intro_libre_acces').html(randtext);
    }

    // délai aléatoire
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
    var sk = null;

    // horrible test de taille d’écran = pas de skrollr sur mobile
    if(vw > 450){
        sk = skrollr.init({
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

        init: function(href){

            // @todo remplacer le setinterval par 
            // requestAnimationFrame(callback)
            clearInterval(texte.check_interval);

            var images_refs = [], // stockage des références
                aside_images = [], // stockage des images dans le #aside
                el = document.querySelector(href);
                images = el.querySelectorAll('.texte img'),
                aside = document.querySelector('#aside');

            // on cache le aside
            aside.classList.add('hidden');
            // on le vide de son potentiel précédent contenu
            aside.innerHTML = '';

            for (var i = 0; i < images.length; i++) {
                var image = images[i];
                var span =  document.createElement('span');
                span.setAttribute('rel', i);
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

                // on cache l’image originale
                image.style.display='none';
            };

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

            var txt = textelement;
            audio.textcontainer.classList.remove('marquee');
            audio.texte.innerHTML = txt;
            void audio.textcontainer.offsetWidth; // trick : https://css-tricks.com/restart-css-animation/
            audio.textcontainer.classList.add('marquee');

            audio.textcontainer.style.animationDuration = txt.length * 250; // magick number
        },
        destroy:function(){
            audio.element.pause();
            audio.button.classList.remove('playing');
            audio.button.classList.add('paused');
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

            // instanciation de Plyr
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
        
        var href = $(this).attr('href');
        displayContent(href);
        e.preventDefault();
        e.stopPropagation();
    });

    var current = {
        content_type:null,
        content_id:null
    }

    // affichage du contenu
    function displayContent(href){
        if (href == null) return;

        var $target = $(href),
            type = $target.attr('data-type'),
            has_gallery = $target.attr('data-gallery') ? true : false;

        // gestion de l’historique
        var url = '?' + href.substring(1);
        history.pushState({hash: href}, "", url);


        // live open graph modification
        var og_tags = {
            description: $target.attr('data-og_description'),
            image: $target.attr('data-og_image'),
            type: 'article',
            url: document.base_url + href
        }
        for (var key in og_tags) {
            $('#og_' + key ).attr('content', og_tags[key]);
        }

        // cas de la vidéo
        if (type == "video") {
            video.destroy();
            video.new( href );
        } else {
            video.destroy();
        }

        // cas d’une galerie
        if (has_gallery) {

            gallery.destroy();
            gallery.new( href );
        } else {
            gallery.destroy();
        }

        // cas de l’audio
        if (type == "audio") {
            var mp3 = $target.attr('data-mp3'),
                text = $target.find('.audio p').text();

            audio.newaudio( mp3, text );
            
        } else {
            audio.destroy();
        }

        // cas du texte
        if (type == "texte") {
            texte.init( href );
        } else {
            texte.destroy();
        }

        // gestion de l’affichage des contenus

        // on masque le précédent contenu
        $(current.content_id).addClass('hidden').css('display', 'none');


        // séquence d’animation du scroll
        var $skbody = $('#skrollr-body');

        $skbody.animate({
            scrollTop: 0
        }, 'slow', function(){

            $('html, body').animate({
                scrollTop: $skbody.offset().top
            }, 'slow', function(){

                // pas d’affichage si audio
                if (type=='audio') return false;

                $target.slideDown('slow', function() {
                    $('#aside, #content').removeClass('hidden');
                    $(this).removeClass('hidden');
                    $(this).addClass('visible');
                    if (sk != null) {
                        sk.refresh();
                    }
                });

                current.content_type = type;
                current.content_id = href;
            });
        });

    };


    // history popstate
    window.addEventListener('popstate', function(event) {
        if (event.state.hash) {
            displayContent(event.state.hash);
        }
    });


    // chargement initial
    // recherche si un paramètre est présent dans l’url
    // élimine le premier caractère (?) : .substring(1)
    // prend uniquement le premier paramètre : split('&')[0]
    var srch = window.location.search.substring(1).split('&')[0];
    console.log(srch)

    // hash management (visite d’une page qui contient un ?hash)
    if(srch != ""){
        var hash = "#" + srch;
        if($(hash).length){
            switchToHome(); // in intro.js
            displayContent(hash);
        } else {
            history.replaceState({hash: ""}, document.title, document.location.href);
        }

    }


})
