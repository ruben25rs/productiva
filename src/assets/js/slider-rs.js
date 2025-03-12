
let slideIndex = 0;
let timeout;

showSlides();

function showSlides() {
	let i;
	let slides = document.getElementsByClassName("mySlides");
	let dots = document.getElementsByClassName("dot");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";  
	}
	slideIndex++;
	if (slideIndex > slides.length) {
		slideIndex = 1;
	}    
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex-1].style.display = "block";  
	dots[slideIndex-1].className += " active";
	timeout = setTimeout(showSlides, 15000); // Change image every 2 seconds
}

function showSlidesD(n) {
	let i;
	let slides = document.getElementsByClassName("mySlides");
	let dots = document.getElementsByClassName("dot");
	if (n > slides.length) {
		slideIndex = 1
	}    
	if (n < 1) {
		slideIndex = slides.length
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";  
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex-1].style.display = "block";  
	dots[slideIndex-1].className += " active";
}

function parar(){
	window.clearTimeout(timeout)
}

function plusSlides(n) {
	parar()
	showSlidesD(slideIndex += n);
	timeout = setTimeout(showSlides, 15000);
}

function currentSlide(n) {
	parar()
	showSlidesD(slideIndex = n);
	timeout = setTimeout(showSlides, 15000);
}
