import "../../lib/p5/p5-1.4.1.js";


let values = {
	ensembleRadius: 100,
	individualRadius: 120
};

let colors = [
	"#6666ff",
	"#66b266",
	"#ffc966",
	"#ff6666",
	"#b266b2"
];

gsap.to(values, {
	ensembleRadius: 20,
	repeat: -1,
	duration: 3,
	yoyo: true,
	ease: "sine.inOut"
});

gsap.to(values, {
	individualRadius: 50,
	repeat: -1,
	duration: 2.5,
	yoyo: true,
	ease: "power4.inOut"
});


// und ein P5 Sketch:
const mainSketch = function (p) {
	let canvas;
	p.setup = function () {
		canvas = p.createCanvas(500, 500);
		canvas.drawingContext.setLineDash([values.individualRadius*Math.PI / 10, values.individualRadius*Math.PI / 10]);
	};

	p.draw = function () {
		p.background("rgba(255, 255, 255, 0.05)");
		p.push();
		p.noFill();
		p.translate(250, 250);
		p.rotate(p.frameCount / 20);

		for (let i = 0; i < colors.length; i++) {
			p.rotate(Math.PI * 2 / colors.length);
			p.stroke(colors[i]);
			p.push();
			p.translate(values.ensembleRadius, 0);
			p.rotate(p.frameCount / 20);
			p.circle(0, 0, values.individualRadius * 2);
			p.pop();
		}

		p.pop();
	};
};

new p5(mainSketch, document.querySelector("#container"));
