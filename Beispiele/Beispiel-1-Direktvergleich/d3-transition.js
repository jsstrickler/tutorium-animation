import "../../lib/d3/d3-7.4.4.js";

const svg = d3.select("#d3-example div")
	.append("svg")
		.attr("width", 100)
		.attr("height", 300);

const circle = svg.append("circle")
	.attr("cx", 50)
	.attr("cy", 250)
	.attr("r", 20);


function singleBounce() {
	circle
		.transition()
		.duration(1000)
		.ease(d3.easeQuadOut)
		.attr("cy", 100)
		.transition()
		.duration(1000)
		.ease(d3.easeQuadIn)
		.attr("cy", 250)
		.on("end", singleBounce); // Cantina Band: spielt den selben Song nochmal!
}

singleBounce(); // rufen wir einmal auf, später ruft es sich dann selbst auf.
