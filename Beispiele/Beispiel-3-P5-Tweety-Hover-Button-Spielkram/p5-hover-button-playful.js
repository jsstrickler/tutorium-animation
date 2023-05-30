import "../../lib/p5/p5-1.4.1.js";
import { Tween } from "../../lib/tweety/tween.js";

class Button {
	constructor(text) {
		this.text = text;
		this.scale = 1;
		this.rotation = 0;
		this.x = 50;
		this.y = 50;
		this.width = 300;
		this.height = 50;

		this.isHovered = false;
		this.isClicked = false;

		this.defaultValues = {
			rotation: 0,
			scale: 1.0,
			backgroundRed: 200,
			backgroundGreen: 200,
			backgroundBlue: 200,
			// backgroundColor: "#ffffff",
			duration: 1.5,
			easeFunction: "easeOutBack"
		};
		this.hoverValues = {
			rotation: 0.1,
			scale: 1.5,
			backgroundRed: 255,
			backgroundGreen: 0,
			backgroundBlue: 0,
			// backgroundColor: "#ff0000",
			duration: 0.2,
			easeFunction: "easeInQuartic"
		};
		this.clickValues = {
			rotation: 0,
			scale: 1.0,
			// backgroundColor: "#00ff00"
		};

		/** current color */
		this.backgroundRed = this.defaultValues.backgroundRed;
		this.backgroundGreen = this.defaultValues.backgroundGreen;
		this.backgroundBlue = this.defaultValues.backgroundBlue;
		this.textColor = "black";

		this.tween = null;
	}

	updateTween(values) {
		if (this.tween) {
			this.tween.stop();
			this.tween = null;
		}

		console.log(`starting new tween to ${JSON.stringify(values)} for button ${this.text}!`);
		values.ease = values.easeFunction; // we need a copy, because Tweety will delete the property
		this.tween = new Tween(this, values.duration, values);
	}

	draw(p) {
		const halfWidth = this.width / 2;
		const halfHeight = this.height / 2;

		p.push();
		p.translate(this.x + halfWidth, this.y + halfHeight);

		// rotate around center
		p.rotate(this.rotation);
		p.scale(this.scale);

		p.fill(this.backgroundRed, this.backgroundGreen, this.backgroundBlue);
		p.rect(-halfWidth, -halfHeight, this.width, this.height);
		p.textAlign(p.CENTER, p.CENTER);
		p.fill("#000000");
		p.text(this.text, 0, 0);
		p.pop();
	}

	hitTest(xPos, yPos) {
		if (
			xPos > this.x && xPos < (this.x+this.width) &&
			yPos > this.y && yPos < (this.y+this.height)
		) {
			if (!this.isHovered) { // stellt sicher, dass wir das nur einmal aufrufen! [maus draußen] -> [maus drinnen]
				this.isHovered = true;
				this.updateTween(this.hoverValues);
			}
		} else {
			if (this.isHovered) { // stellt sicher, dass wir das nur einmal aufrufen! [maus drinnen] -> [maus draußen]
				this.isHovered = false;
				this.updateTween(this.defaultValues);
			}
		}
		return this.isHovered;
	}
}

// Ok, hier ein paar Buttons:
let button = new Button("Hallo Welt");
let button2 = new Button("OHAI");
let button3 = new Button("Hola!");
button.x = 200;
button2.x = 200;
button2.y = 120;
button2.width = 60;
button2.hoverValues.backgroundRed = 0;
button2.hoverValues.backgroundGreen = 255;
button2.hoverValues.backgroundBlue = 0;
button3.x = 200;
button3.y = 190;


// und ein P5 Sketch:
const mainSketch = function (p) {

	p.setup = function () {
		p.createCanvas(700, 400);
	};

	p.draw = function () {
		p.clear();
		p.text("Klicken Sie die buttons!", 200, 20);
		button.hitTest(p.mouseX, p.mouseY);
		button2.hitTest(p.mouseX, p.mouseY);
		button3.hitTest(p.mouseX, p.mouseY);
		button.draw(p);
		button2.draw(p);
		button3.draw(p);
	};

	p.mouseClicked = function () {
		if (button.hitTest(p.mouseX, p.mouseY)) {
			gsap.to(button, {x: -700});
		}
		if (button2.hitTest(p.mouseX, p.mouseY)) {
			gsap.to(button2, {x: 1500});
		}
		if (button3.hitTest(p.mouseX, p.mouseY)) {
			gsap.to(button3, {y: -500});
		}
	};
};

new p5(mainSketch, document.querySelector("#container"));
