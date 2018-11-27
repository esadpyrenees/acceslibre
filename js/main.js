$(function(){
    
    // audioplayer
    var $audioplayer = $('#audioplayer'),
        $audio = $('#audio'),
        $audioplayertext = $('#audioplayertext'),
        $audioplayerbutton =$('#audioplayerbutton'),
        audio_element = $audio[0];

    $audioplayerbutton.on('click', function(){
        if (audio_element.paused) {
            this.className='playing';
            audio_element.play();
          } else {
            this.className='paused';
            audio_element.pause();
          }
    })

    // liens navigation principale
    $('.homelink a').on('click', function(e){
        e.stopPropagation();
        e.preventDefault();
        var $this = $(this);

        // cas de l’audio

        if ($this.attr('data-type') == "audio") {
            $audioplayer.removeClass('vide');
            audio_element.pause();
            audio_element.setAttribute('src', $this.attr('data-mp3') );
            audio_element.addEventListener('canplaythrough', function() { 
                $audioplayerbutton.toggleClass('playing paused');
                audio_element.play();
            }, false);
            audio_element.addEventListener('ended', function() { 
               $audioplayer.addClass('vide')
            }, false);
            
            $audioplayertext.text($this.find('.audioinfo').text())
            return false;
        }

        // cas des pages texte ou video

        var $target = $($(this).attr('href'));
        var $is_article_visible = $('article.visible');
        $is_article_visible.addClass('hidden');

        $('#home').animate({
            scrollTop: 0
        }, 'slow', function(){
            $('html, body').animate({
                scrollTop: $('#home').offset().top
            }, 'slow', function(){

                $target.slideDown('fast', function() {
                    $('#content').removeClass('hidden');
                    var $this = $(this);
                    $is_article_visible.css('display', 'none');
                    $this.css('display', 'block');
                    $this.removeClass('hidden');
                    $this.addClass('visible');
                    setTimeout(function(){

                    }, 500)
                });   
            });
        });
        
    });


    
    

    // responsive video

    $('iframe').wrap('<div class="videoWrapper"></div>');
    
})