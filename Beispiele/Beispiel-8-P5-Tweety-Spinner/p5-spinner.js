import "../../lib/p5/p5-1.4.1.js";
import {Tween} from "../../lib/tweety/tween.js";

let outerCircle = {
	radius: 50
};

let colors = [
	"#6666ff",
	"#66b266",
	"#ffc966",
	"#ff6666",
	"#b266b2"
];

new Tween(outerCircle, 0.5, {radius: 20, repeat: -1, yoyo: true, ease: "easeInQuadratic"});

// und ein P5 Sketch:
const mainSketch = function (p) {

	p.setup = function () {
		p.createCanvas(500, 500);
	};

	p.draw = function () {
		p.clear();
		p.noStroke();
		p.push();
		p.translate(250, 250);
		p.rotate(p.frameCount / 20);

		for (let i = 0; i < colors.length; i++) {
			p.rotate(Math.PI * 2 / colors.length);
			p.fill(colors[i]);
			p.circle(outerCircle.radius, 0, 20);
		}

		p.pop();
	};
};

new p5(mainSketch, document.querySelector("#container"));
