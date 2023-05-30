import "../../lib/p5/p5-1.4.1.js";
import {Tween} from "../../lib/tweety/tween.js";

const someAnimatedValues = {
	cash: 0,
	crownSize: 0.01
};

const mainSketch = function (p) {
	p.setup = function () {
		p.createCanvas(700, 400);
	};

	p.draw = function () {
		p.clear();
		p.textSize(16);
		p.textAlign(p.LEFT, p.BOTTOM);
		p.text("click somewhere", 200, 20);
		p.fill("#ffcc4d");
		p.rect(200, 200, someAnimatedValues.cash, 50);
		p.fill("black");
		p.text(Math.round(someAnimatedValues.cash) + " €", 200, 195);
		p.textSize(someAnimatedValues.crownSize);
		p.textAlign(p.CENTER, p.BOTTOM);
		p.text("👑", 600, 200);
	};

	p.mouseClicked = function () {
		// wir nehmen mal absichtlich eine Animations-Dauer, die wir nicht voraussagen können.
		const someRandomDuration = Math.random() * 2 + 1;

		// wir starten eine Animation und sobald diese fertig ist, starten wir die Nächste
		// indem wir onComplete eine Funktion mitgeben.
		const tween1 = new Tween(someAnimatedValues, someRandomDuration, {cash: 400});
		tween1.onCompletion(function () {
			new Tween(someAnimatedValues, 0.3, {crownSize: 70, ease: "easeInCubic"});
		});
	}
};

new p5(mainSketch, document.querySelector("#container"));
