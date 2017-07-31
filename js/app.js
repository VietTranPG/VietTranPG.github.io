(function () {

    var md = new MobileDetect(window.navigator.userAgent);
    var isMobile = md.mobile();

    var guestNames = decodeURIComponent(window.location.search);
    try{
        guestNames = punycode.decode(guestNames);
    } catch(e) {
        console.log("plain invite");
    }
    guestNames = guestNames.substring(1);
    $('.guests').text(guestNames);

    $("#send-btn").on('click',function(){
        var text = $('.guestText').val();
        console.log(text + " " + guestNames);

        $.get( "http://77.51.189.143:8080/response", { guestNames: guestNames, body: text })
            .done(function( data ) {
                $('.success').attr('style','display: block !important');
                $('#send-btn').prop('disabled', true);
            })
            .fail(function(data){
                console.error(data);
            });
    });

    //caching
    $('<img/>')[0].src = 'img/remote/remoteOnOff.png';
    $('<img/>')[0].src = 'img/remote/remoteOffOn.png';


    window.onload = function () {
        var body = $("html, body");
        var remoteTop = 1000;
        var ropeHeight = 550;
        var top = 800;

        $.material.init();

        $('body').attr('style', 'display:block');


        var $fotoramaDiv = $('#fotorama').fotorama({
            arrows: false,
            transition: 'crossfade'
        });

        // 2. Get the API object.
        var fotorama = $fotoramaDiv.data('fotorama');

        // 3. Inspect it in console.
        console.log(fotorama);
        $('.myPrev').on('click', function () {
            fotorama.show('<');
        });
        $('.myNext').on('click', function () {
            fotorama.show('>');
        });


        setInterval(function () {
            console.log(document.body.scrollTop);
            console.log(document.getElementById('remote-rope').offsetHeight);
        }, 2000);

        $('#remote-rope').attr('style', 'display:block');
        $('.remote').attr('style', 'display:block');


        function moveRemote(length) {
            remoteTop = remoteTop + length;
            ropeHeight = ropeHeight + length;

            setTimeout(function () {
                $('#remote-rope').animate({height: ropeHeight + 'px'}, 1500, 'easeOutElastic');
                $('.remote').animate({top: remoteTop + 'px'}, 1500, 'easeOutElastic');
            }, 500);
        }

        function smoothScroll(length) {
            top = top + length;

            setTimeout(function () {
                body.stop().animate({scrollTop: top + 'px'}, '200', 'swing');
            }, 600);
        }

        $('#remoteUp').on('click', function () {
            $('.remote').removeClass("remoteOffOff").addClass("remoteOnOff");
            setTimeout(function () {
                $('.remote').removeClass("remoteOnOff").addClass("remoteOffOff");
            }, 300);
            if (remoteTop > 1050) {
                moveRemote(-1050);
                smoothScroll(-1050);
            }
        });

        $('#remoteDown').on('click', function () {
            $('.remote').removeClass("remoteOffOff").addClass("remoteOffOn");
            setTimeout(function () {
                $('.remote').removeClass("remoteOffOn").addClass("remoteOffOff");
            }, 150);
            if (remoteTop < 4150) {
                moveRemote(1050);
                smoothScroll(1050);
            }
        });


        if(!isMobile){
            $('#clouds').pan({fps: 30, speed: 0.5, dir: 'right'});
            var scene = document.getElementById('scene');
            var parallax = new Parallax(scene);

            var scene2 = document.getElementById('scene2');
            var parallax2 = new Parallax(scene2);

            var scene3 = document.getElementById('scene3');
            var parallax3 = new Parallax(scene3);

        } else {
            console.log("mobile detect " +  md.mobile() );
        }

        var scene4 = document.getElementById('scene4');
        var parallax4 = new Parallax(scene4);

        $('#cakes').sprite({fps: 8, no_of_frames: 1})
            .spRandom({
                top: 3600,
                left: 30,
                right: 100,
                bottom: 3800,
                speed: 3500,
                pause: 1000
            });

        $('#balloons').sprite({fps: 8, no_of_frames: 1})
            .spRandom({
                top: 1450,
                left: 5,
                right: 55,
                bottom: 1500,
                speed: 2000,
                pause: 1000
            });

        $('#spouses').sprite({fps: 8, no_of_frames: 1})
            .spRandom({
                top: 0,
                left: 0,
                right: 27,
                bottom: 29,
                speed: 3500,
                pause: 1000
            });

        $('#plane').sprite({fps: 10, no_of_frames: 3});
    };

})();