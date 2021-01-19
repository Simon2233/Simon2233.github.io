const TypeWriter = function(txtElement, words, wait = 2000) {
	this.txtElement = txtElement;
	this.words = words;
	this.txt = '';
	this.wordIndex = 0;
	this.wait = parseInt(wait, 10);
	this.type();
	this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function() {
	// Current index of word
	const current = this.wordIndex % this.words.length;
	// Get full text of current word
	const fulltxt = this.words[current];

	if(this.isDeleting) {
		// Remove Char
		this.txt = fulltxt.substring(0, this.txt.length-1)
	} else {
		// Add Char
		this.txt = fulltxt.substring(0, this.txt.length+1)
	}

	// Insert txt into element
	this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

	// Initial Type Speed
	let typeSpeed = 225;

	if(this.isDeleting) {
		typeSpeed /= 2;
	}

	// If word is complete
	if (!this.isDeleting && this.txt === fulltxt) {
		if (current == this.words.length - 1) {
			setTimeout(() => loadLanding(), 2200);
			return;
		}
		// Make pause at end of word
		typeSpeed = this.wait;
		// Set Deleting to true
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		// Move to next word
		this.wordIndex++;
		// Pause before start typing
		typeSpeed = 400;
	}

	setTimeout(() => this.type(), typeSpeed);
}

// Init on DOM Load
// document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', loadLanding);

// Init App
function init() {
	const txtElement = document.querySelector('.txt-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');
	// Init Type Writer
	new TypeWriter(txtElement, words, wait);
}

function loadLanding() {
	document.getElementById("animation").style.display = "none";
	document.getElementById("demo-canvas").style.display = "block";
	document.getElementById("content").style.display = "block";
	document.getElementById("navigation").style.display = "block";
	document.getElementById("cd-timeline").style.display = "block";

	// Currently doesn't handle well refreshing while timeline is already in view
	document.addEventListener('scroll', function (e) {
		let hiddenCard = document.querySelector('.cd-timeline-content:not(.animate)');
		if (hiddenCard != null) {			   
			if (isScrolledIntoView(hiddenCard)) {
			 	hiddenCard.classList.add('animate');
			}
		}
	});
}

function isScrolledIntoView(elem) {
    var rect = elem.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    // var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}

function darkmode() {
	let icon = document.getElementById("theme")
	if (icon.classList.contains("fa-moon")) {
		icon.classList.remove("fa-moon");
		icon.classList.add("fa-sun");
	} else {
		icon.classList.remove("fa-sun");
		icon.classList.add("fa-moon");
	}
}
