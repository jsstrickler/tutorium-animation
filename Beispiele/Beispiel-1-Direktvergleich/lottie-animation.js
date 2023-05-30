import "../../lib/lottie/lottie-5.9.5.js";

const animData = {
	container: document.querySelector('#lottie-example div'),
	renderer: 'svg',
	loop: true,
	autoplay: true,
	path: 'assets/synfig-test.json'
};

lottie.loadAnimation(animData);
