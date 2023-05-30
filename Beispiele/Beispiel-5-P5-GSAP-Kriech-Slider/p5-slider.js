import "../../lib/p5/p5-1.4.1.js";

class Slider {
	/**
	 * @param {Number} width in pixels
	 * @param {Number} height in pixels
	 */
	constructor(width, height, foregroundColor = "#ff0000", backgroundColor = "#a0a0a0") {
		this.x = 50;
		this.y = 50;
		this.width = width;
		this.height = height;
		this.foregroundColor = foregroundColor;
		this.backgroundColor = backgroundColor;

		this.value = 0.5;
		this.displayValue = 0;
		this.updateTween();
	}

	draw(p) {
		p.push();
		p.translate(this.x, this.y);

		p.fill(this.backgroundColor);
		p.rect(0, 0, this.width, this.height);
		p.fill(this.foregroundColor);
		p.rect(0, 0, this.width * this.displayValue, this.height);

		p.textAlign(p.CENTER, p.CENTER);
		p.fill("black");
		p.text(Math.round(this.displayValue*100) + "%", this.width/2, this.height/2);

		p.pop();
	}

	setFromCoordinates(x) {
		const x0 = x - this.x;
		this.value = x0 / this.width;
		this.updateTween();
	}

	updateTween() {
		gsap.to(this, {displayValue: this.value, ease: "sine.inOut", delay: 0.4, duration: 5});
	}

	hitTest(xPos, yPos) {
		if (
			xPos > this.x && xPos < (this.x+this.width) &&
			yPos > this.y && yPos < (this.y+this.height)
		) {
			return true;
		} else {
			return false;
		}
	}
}

// Ok, hier ein paar Slider:
const slider1 = new Slider(400, 30);
const slider2 = new Slider(600, 40, "#ff7f00");
const slider3 = new Slider(200, 25, "#ffff00");

slider2.y = 100;
slider3.y = 180;

// und ein P5 Sketch:
const mainSketch = function (p) {

	p.setup = function () {
		p.createCanvas(700, 400);
	};

	p.draw = function () {
		p.clear();
		p.text("Klicken Sie auf dem Slider herum!", 200, 20);
		slider1.draw(p);
		slider2.draw(p);
		slider3.draw(p);
	};

	p.mouseClicked = function () {
		if (slider1.hitTest(p.mouseX, p.mouseY)) {
			slider1.setFromCoordinates(p.mouseX);
		}
		if (slider2.hitTest(p.mouseX, p.mouseY)) {
			slider2.setFromCoordinates(p.mouseX);
		}
		if (slider3.hitTest(p.mouseX, p.mouseY)) {
			slider3.setFromCoordinates(p.mouseX);
		}
	};
};

new p5(mainSketch, document.querySelector("#container"));
