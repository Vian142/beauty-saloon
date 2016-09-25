$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	// try {
	// 	$.browserSelector();
	// 	if($("html").hasClass("chrome")) {
	// 		$.smoothScroll();
	// 	}
	// } catch(err) {

	// };

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");


//Слайдер
$('.owl-carousel').owlCarousel({
    items:1,
    loop:true,
    autoplay:true,
    autoHeight:true
});


});


$(document).ready(function() {

$('.image-popup-vertical-fit').magnificPopup({
	type: 'image',
	closeOnContentClick: true,
	mainClass: 'mfp-img-mobile',
	image: {
		verticalFit: true
	}	
});

/*-----------------*/
$(".menu-trigger").click(function() {
  $(".menu-trigger").toggleClass("active");

  if (   $(".menu-trigger").hasClass("active") ){
		$(".navigation").animate({width:360}, 400);
	} else {
		$(".navigation").animate({width:0});
	};
});

$(".navigation li a").click(function(){
	$(".navigation").animate({width:0}, 400);
	$(".menu-trigger").toggleClass("active");
});

    });//end ready