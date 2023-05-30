import "../../lib/p5/p5-1.4.1.js";
import { Tween } from "../../lib/tweety/tween.js";

class Button {
	constructor(text) {
		this.text = text;
		this.x = 50;
		this.y = 50;
		this.width = 300;
		this.height = 50;

		
		this.defaultValues = {
			red: 200,
			green: 200,
			blue: 200,
		};
		this.hoverValues = {
			red: 255,
			green: 0,
			blue: 0,
		};
		this.clickValues = {
			red: 0,
			green: 255,
			blue: 0,
		};
		
		/** current color. Tweety can't interpolate colors. But red green and blue are just numbers :-D  */
		this.backgroundRed = this.defaultValues.red;
		this.backgroundGreen = this.defaultValues.green;
		this.backgroundBlue = this.defaultValues.blue;
		this.textColor = "black";


		this.isHovered = false;
		this.tween = null;
	}

	updateTargetColor(newColor) {
		if (this.tween) {
			this.tween.stop();
			this.tween = null;
		}

		console.log(`starting new tween to ${JSON.stringify(newColor)} for button ${this.text}!`);
		this.tween = new Tween(this, 0.25, {
			backgroundRed: newColor.red,
			backgroundGreen: newColor.green,
			backgroundBlue: newColor.blue,
			ease: "linear"
		});
	}

	draw(p) {
		p.fill(this.backgroundRed, this.backgroundGreen, this.backgroundBlue);
		p.rect(this.x, this.y, this.width, this.height);
		p.textAlign(p.CENTER, p.CENTER);
		p.fill("#000000");
		p.text(this.text, this.x + this.width / 2, this.y + this.height / 2);
	}

	hitTest(xPos, yPos) {
		if (
			xPos > this.x && xPos < (this.x+this.width) &&
			yPos > this.y && yPos < (this.y+this.height)
		) {
			if (!this.isHovered) { // stellt sicher, dass wir das nur einmal aufrufen! [maus draußen] -> [maus drinnen]
				this.isHovered = true;
				this.updateTargetColor(this.hoverValues);
			}
		} else {
			if (this.isHovered) { // stellt sicher, dass wir das nur einmal aufrufen! [maus drinnen] -> [maus draußen]
				this.isHovered = false;
				this.updateTargetColor(this.defaultValues);
			}
		}
		return this.isHovered;
	}
}

// Ok, hier ein paar Buttons:
let button = new Button("Hallo Welt");
let button2 = new Button("OHAI");
let button3 = new Button("Hola!");
button2.y = 120;
button2.width = 60;
button3.y = 190;


// und ein P5 Sketch:
const mainSketch = function (p) {

	p.setup = function () {
		p.createCanvas(500, 250);
	};

	p.draw = function () {
		p.clear();
		button.hitTest(p.mouseX, p.mouseY);
		button2.hitTest(p.mouseX, p.mouseY);
		button3.hitTest(p.mouseX, p.mouseY);
		button.draw(p);
		button2.draw(p);
		button3.draw(p);
	};

	p.mouseClicked = function () {
		console.log("click");
	};
};

new p5(mainSketch, document.querySelector("#container"));
