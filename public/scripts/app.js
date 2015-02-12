/**
 * Created by Les-Rae Superman on 2014-12-05.
 */

$(function() {
    $(".customBtn").click(function(){
        $(".intro").slideUp();
        setUp40PPL();
        $(".imgGallery").delay(2000).slideDown(function() {

            $(".subTxt").fadeIn("fast");
            if($( document ).width() >= 480) {
                $('.otp').fadeIn("fast");
            }

        });
    });

    var socket = io.connect('http://10.0.0.6:3000');
    socket.on('state', function (data) {
        var userId = $("#userCode").val();
        if(userId == "") {
        }
        else {
          if(data.currState == 1 && userId==data.userId) {
              gotoNext();
          } else if(data.currState == -1 && userId==data.userId) {
              gotoPrev()
          }
          else {
              gotoReset();
          }
        }

    });

    var id = 0;
    var my_state = 0;


    $('.left_arrow').click(function() {
        gotoPrev();
    })
    $('.right_arrow').click(function() {
        gotoNext();
    })

    function gotoNext() {
        my_state++;

        if(my_state >= $('.slides').find('section').length) {
            my_state = 0;
        }

        Reveal.slide(my_state);
    }

    function gotoPrev() {
        my_state--;

        if(my_state < 0) {
            my_state = $('.slides').find('section').length-1;
        }

        Reveal.slide(my_state);
    }

    function gotoReset() {
        Reveal.slide(0);
    }


    function setUp40PPL() {
        Reveal.initialize({

            // Display controls in the bottom right corner
            controls: false,

            // Display a presentation progress bar
            progress: true,

            // Display the page number of the current slide
            slideNumber: false,

            // Push each slide change to the browser history
            history: false,

            // Enable keyboard shortcuts for navigation
            keyboard: true,

            // Enable the slide overview mode
            overview: true,

            // Vertical centering of slides
            center: true,

            // Enables touch navigation on devices with touch input
            touch: true,

            // Loop the presentation
            loop: false,

            // Change the presentation direction to be RTL
            rtl: false,

            // Turns fragments on and off globally
            fragments: true,

            // Flags if the presentation is running in an embedded mode,
            // i.e. contained within a limited portion of the screen
            embedded: false,

            // Number of milliseconds between automatically proceeding to the
            // next slide, disabled when set to 0, this value can be overwritten
            // by using a data-autoslide attribute on your slides
            autoSlide: 0,

            // Stop auto-sliding after user input
            autoSlideStoppable: true,

            // Enable slide navigation via mouse wheel
            mouseWheel: false,

            // Hides the address bar on mobile devices
            hideAddressBar: true,

            // Opens links in an iframe preview overlay
            previewLinks: false,

            // Transition style
            transition: 'default', // default/cube/page/concave/zoom/linear/fade/none

            // Transition speed
            transitionSpeed: 'default', // default/fast/slow

            // Transition style for full page slide backgrounds
            backgroundTransition: 'default', // default/none/slide/concave/convex/zoom

            // The "normal" size of the presentation, aspect ratio will be preserved
            // when the presentation is scaled to fit different resolutions. Can be
            // specified using percentage units.
            width: 563,
            height: 338,

            // Factor of the display size that should remain empty around the content
            margin: 0.1,

            // Bounds for smallest/largest possible scale to apply to content
            minScale: 1.0,
            maxScale: 1.0
        });

        //alert($(".slides > section").length);
    }

});

