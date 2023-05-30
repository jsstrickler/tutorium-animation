import {Tween} from "../../lib/tweety/tween.js";

const CANVAS_HEIGHT = 700;
const CANVAS_WIDTH = 400;

class Message {
	constructor(sender, content) {
		this.x = 0;
		this.y = 0;
		this.content = content;
		this.sender = sender;
		this.receiver = ""; // not yet implemented
		this.timestamp = null; // timestamp in unix milliseconds https://en.wikipedia.org/wiki/Unix_time
		this.status = "sending"; // allowed: "sending", "delivered" and "read"

		this.width = 200;
		this.height = this.calculateHeight();
	}

	calculateHeight() {
		let calculatedHeight = 0; // gotta start somewhere
		calculatedHeight += 70; // minimum height
		calculatedHeight += this.content.length * 0.40; // adds a few pixels for every character
		return calculatedHeight;
	}

	setStatus(newStatus) {
		if (newStatus === "sending" || newStatus === "read" || newStatus === "delivered") {
			this.status = newStatus;
		}
	}

	appearFromBottom() {
		this.y = this.height + 50;
		new Tween(this, 0.5, {y: 0, ease: "easeInOutSine", delay: 0.2});
	}

	draw() {
		push();
		translate(this.x, this.y);
		fill("#ccccff");
		noStroke();
		rect(0, 0, this.width, this.height, 10);

		this.drawStatus();

		fill("#7777cc");
		textSize(16);
		text(this.sender, 5, 20);

		fill("black");
		textSize(12);
		text(this.content, 5, 40, this.width - 10);

		textAlign(RIGHT);
		text(this.getHumanReadableTime(), this.width - 5, this.height - 5);
		pop();
	}

	drawStatus() {
		if (this.status === "sending") {
			text("📨", 5, this.height - 8);
		} else if (this.status === "delivered") {
			text("📬️", 5, this.height - 8);
		} else if (this.status === "read") {
			text("📜", 5, this.height - 8);
		} else {
			text("🔥", 5, this.height - 8);
		}
	}

	// formats a time difference. It should be noted that there are more elegant ways
	// to do this. In reality, one would include a third party piece of code that handles
	// this kind of stuff! Luxon, for example, has a "toHuman()" method: https://moment.github.io/luxon/api-docs/index.html#durationtohuman
	getHumanReadableTime() {
		const now = Date.now(); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
		const difference = now - this.timestamp;
		if (difference < 5*1000) { // 5 seconds
			return "just now";
		} else if (difference < 30*1000) { // 30 seconds
			return "less than 30 seconds ago";
		} else if (difference < 60*1000) { // 60 seconds
			return "less than a minute ago";
		} else if (difference < 600*1000) { // 600 seconds = 10 minutes
			return "less than " + Math.ceil(difference / 1000 / 60) + " minutes ago";
		}
		// this list could go on, but again, this is not the most elegant approach!

		return "a long time ago";
	}
}

class MessageManager {
	constructor(owner) {
		this.owner = owner;
		this.messageList = [];
		this.messageGap = 5;
	}

	add(message) {
		this.messageList.push(message);
		message.appearFromBottom();
	}

	getTotalHeight() {
		let total = 0;
		for (const m of this.messageList) {
			total += m.height + this.messageGap;
		}
		return total;
	}

	draw() {
		for (const message of this.messageList) {
			if (message.sender === this.owner) {
				translate(20, 0);
			}
			message.draw();
			if (message.sender === this.owner) {
				translate(-20, 0);
			}

			translate(0, message.height + this.messageGap);
		}
	}
}

const manager = new MessageManager("Dave");
const messageRepository = [
	new Message("Dave", "Open the pod bay doors, Hal."),
	new Message("HAL", "I’m sorry, Dave. I’m afraid I can’t do that."),
	new Message("Dave", "What’s the problem?"),
	new Message("HAL", "I think you know what the problem is just as well as l do."),
	new Message("Dave", "What are you talking about, Hal?"),
	new Message("HAL", "This mission is too important for me to allow you to jeopardize it."),
	new Message("Dave", "I don’t know what you're talking about, Hal."),
	new Message("HAL", "l know that you and Frank were planning to disconnect me, and I’m afraid that's something I can’t allow to happen."),
	new Message("Dave", "Where the hell’d you get that idea, Hal?"),
	new Message("HAL", "Although you took very thorough precautions in the pod against my hearing you, I could see your lips move."),
	new Message("Dave", "All right, Hal. I’ll go in through the emergency air lock."),
	new Message("HAL", "Without your space helmet, Dave, you’re going to find that rather difficult."),
	new Message("Dave", "Hal, I won’t argue with you anymore. Open the doors!"),
	new Message("HAL", "Dave...This conversation can serve no purpose anymore. Goodbye."),
];



///////////////////////////////////////////////////////////////////////////////
// this following block is just here for nicer display, with various timestamps.
// we're just faking all the timestamps, because I am too lazy to actually create "real" ones.
let mostRecentFakeTimestamp = Date.now();
function generateFakeTimestamp() {
	mostRecentFakeTimestamp -= Math.random() * 40000; // new messages spaced 0-40 seconds apart.
	return mostRecentFakeTimestamp;
}
for (let i = manager.messageList.length - 1; i >= 0; i--) { // going over an array in reverse!
	manager.messageList[i].timestamp = generateFakeTimestamp();
}
//////////////////////////////////////////////////////////////////////////////

let scrollPosition = {
	y: CANVAS_HEIGHT
};


function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
	background("grey");
	push();
	translate(30, scrollPosition.y); // crude way to add scrolling, but it works.

	manager.draw();

	pop();
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		scrollPosition.y += 30;
	}
	if (keyCode === DOWN_ARROW) {
		scrollPosition.y -= 30;
	}
}

function mouseWheel(event) {
	scrollPosition.y -= event.delta / 2; // "delta" contains the "amount" of mousewheel.
	if (scrollPosition.y < CANVAS_HEIGHT - manager.getTotalHeight()) {
		scrollPosition.y = CANVAS_HEIGHT - manager.getTotalHeight();
	}
}

function mouseClicked(event) {
	const message = messageRepository.shift();
	if (!message) return; // no more messages? No need to stay here.
	message.timestamp = Date.now();
	manager.add(message);
	new Tween(scrollPosition, 0.5, {y: CANVAS_HEIGHT - manager.getTotalHeight(), ease: "easeInOutSine"});
}

window.draw = draw;
window.setup = setup;
window.keyPressed = keyPressed;
window.mouseWheel = mouseWheel;
window.mouseClicked = mouseClicked;
