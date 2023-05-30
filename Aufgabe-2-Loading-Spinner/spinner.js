import "../lib/p5/p5-1.4.1.js";
import { Tween } from "../lib/tweety/tween.js";

class Loader {
	constructor(x, y, off, color) {
		this.x = x;
		this.y = y;
		this.r = 80;
		this.stroke = color;
		this.strokeWeight = 2;
		this.startPoint = 0;
		this.endPoint = 1;
		this.offset = off;

		this.animationSpeed = 1.5;

		this.updateTween();
	}

	show(p) {
		p.push();
		p.translate(this.x, this.y);
		p.angleMode(p.DEGREES);
		p.rotate(-90);
		p.noFill();
		p.stroke(this.stroke);
		p.strokeWeight(this.strokeWeight);
		p.strokeCap(p.ROUND);
		p.arc(0, 0, this.r * 2, this.r * 2, this.startPoint, this.endPoint);
		p.pop();
	}

	updateTween() {
		setTimeout(() => {
			new Tween(this, this.animationSpeed, {
				endPoint: 360,
				repeat: -1,
				ease: "easeInOutQuartic",
			});
			setTimeout(() => {
				new Tween(this, this.animationSpeed, {
					startPoint: 360,
					repeat: -1,
					ease: "easeInOutQuartic",
				});
			}, 500);
		}, this.offset);
	}
}

let loaders = [];

// gerne mit den Werten rumspielen
const totalX = 325;
const totalY = 325;
const totalR = 100;
let totalLoaderCount = 12;
const animationOffset = 125; // in ms

const mainSketch = function (p) {
	p.setup = function () {
		p.createCanvas(750, 750);
		for (let i = 0; i < totalLoaderCount; i++) {
			p.colorMode(p.HSB);
			loaders.push(
				new Loader(
					getX(i),
					getY(i),
					animationOffset * i,
					p.color((360 / totalLoaderCount) * i, 100, 100)
				)
			);
		}
	};

	p.draw = function () {
		p.background("#212121");
		for (let loader of loaders) {
			loader.show(p);
		}

		// // fügt alle 30 frames einen neuen Loader hinzu
		// if(p.frameCount % 30 === 0) {
		// 	totalLoaderCount++;
		// 	let i = totalLoaderCount -1;
		// 	loaders.push(
		// 		new Loader(
		// 			getX(i),
		// 			getY(i),
		// 			animationOffset * i,
		// 			p.color((360 / totalLoaderCount) * i, 100, 100)
		// 		)
		// 	);

		// 	for (let i = 0; i < totalLoaderCount; i++) {
		// 		loaders[i].x = getX(i);
		// 		loaders[i].y = getY(i);
		// 		loaders[i].stroke = p.color((360 / totalLoaderCount) * i, 100, 100);
		// 	}
		// }
	};

	function getX(i) {
		return totalR * Math.cos(((2 * Math.PI) / totalLoaderCount) * i) + totalX;
	}

	function getY(i) {
		return totalR * Math.sin(((2 * Math.PI) / totalLoaderCount) * i) + totalY;
	}
};

new p5(mainSketch, document.querySelector("#spinner"));
