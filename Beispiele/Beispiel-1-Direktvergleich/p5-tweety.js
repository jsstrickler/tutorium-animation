import "../../lib/p5/p5-1.4.1.js";
import { Tween } from "../../lib/tweety/tween.js";

const mainSketch = function (p) {
	
	let circlePosition = {
		x: 30,
		y: 50
	}

	function hop() {
		new Tween(circlePosition, 1, {
			y: 200,
			ease: "easeInCubic",
			yoyo: true,
			repeat: -1
		});
	}

//	setInterval(hop, 1000); // hop every second.
hop();

	p.setup = function () {
		p.createCanvas(100, 250);

	};

	p.draw = function () {
		p.clear();
		p.circle(circlePosition.x, circlePosition.y, 20);
	}
};

new p5(mainSketch, document.querySelector("#p5-and-tweety-example div"));
