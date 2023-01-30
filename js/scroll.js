const hidingObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		entry.target.classList.toggle('show', entry.isIntersecting);
	});
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach(((element, i) => {
	element.style.transitionDelay = i * 200 + "ms";
	hidingObserver.observe(element);
}));
