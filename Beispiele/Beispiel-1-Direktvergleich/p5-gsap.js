import "../../lib/p5/p5-1.4.1.js";

const mainSketch = function (p) {
	
	let circlePosition = {
		x: 30,
		y: 200
	}

	const circleBounce = gsap.timeline();
	circleBounce
		.to(circlePosition, {duration: 1, ease: Power2.easeOut, y: 50})
		.to(circlePosition, {duration: 1, ease: Power2.easeIn, y: 200});
	circleBounce.repeat(-1); // -1 bedeutet "immer wieder", siehe https://greensock.com/docs/v3/GSAP/gsap.timeline()#h3-special-properties-and-callbacks

	p.setup = function () {
		p.createCanvas(100, 250);

	};

	p.draw = function () {
		p.clear();
		p.circle(circlePosition.x, circlePosition.y, 20);
	}
};

new p5(mainSketch, document.querySelector("#p5-and-gsap-example div"));
