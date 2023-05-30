import "../lib/p5/p5-1.4.1.js";
import { Tween } from "../lib/tweety/tween.js";

let rect = {
	x: 30,
	y: 50,
	width: 50,
	height: 50,
	color: "#000060",
	strokeColor: "#000000",
	strokeWeight: 0,
	scale: 1.0,
	rotation: 0,
};

const mainSketch = function (p) {
	p.setup = function () {
		p.createCanvas(500, 100);
	};

	p.draw = function () {
		p.clear();
		p.translate(rect.x, rect.y);
		p.scale(rect.scale);
		p.rotate(rect.rotation);
		p.fill(rect.color);
		p.stroke(rect.strokeColor);
		p.strokeWeight(rect.strokeWeight);
		p.rect(-rect.width/2, -rect.height/2, rect.width, rect.height);
	}

	new Tween(rect, 2.5, {x: 400, rotation: 6, repeat: -1, ease: "linear"})
};

new p5(mainSketch, document.querySelector("#example-tweety"));
