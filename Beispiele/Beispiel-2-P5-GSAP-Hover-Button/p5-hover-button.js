import "../../lib/p5/p5-1.4.1.js";

class Button {
	constructor(text) {
		this.text = text;
		this.x = 50;
		this.y = 50;
		this.width = 300;
		this.height = 50;

		
		this.defaultColor = "#ffffff";
		this.hoverColor = "#ff0000";
		this.clickColor = "#00ff00";
		
		/** current color */
		this.backgroundColor = this.defaultColor;
		this.textColor = "black";


		this.isHovered = false;
		this.tween = null;
	}

	updateTargetColor(newColor) {
		if (this.tween) {
			this.tween.kill();
		}

		console.log(`starting new tween to ${newColor} for button ${this.text}!`);
		this.tween = gsap.to(this, {backgroundColor: newColor});
	}

	draw(p) {
		p.fill(this.backgroundColor);
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
				this.updateTargetColor(this.hoverColor);
			}
		} else {
			if (this.isHovered) { // stellt sicher, dass wir das nur einmal aufrufen! [maus drinnen] -> [maus draußen]
				this.isHovered = false;
				this.updateTargetColor(this.defaultColor);
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
