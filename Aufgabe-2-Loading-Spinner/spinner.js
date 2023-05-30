import "../lib/p5/p5-1.4.1.js";
import { Tween } from "../lib/tweety/tween.js";

const mainSketch = function (p) {
	p.setup = function () {
		p.createCanvas(500, 500);
	};

	p.draw = function () {
	}
};

new p5(mainSketch, document.querySelector("#spinner"));
