// For documentation on these options, see the README at https://github.com/shadowfacts/uebersicht-github-activity/
const options = {
	user: "Coordinate-Cat",
	size: 7,
	incrAmount: 6,
	margin: 0,
	vary: ["size", "color"],
	shape: "square",
	theme: "white",
	colors: {
		overrides: {
			none: [null, null],
			one: [null, null],
			two: [null, null],
			three: [null, null],
			max: [null]
		},
		white: {
			none: ["#555", "#555"],
			one: ["#999", "#999"],
			two: ["#fff", "#fff"],
			three: ["#fff", "#fff"],
			max: ["#fff", "#fff"]
		},
	}
};

const axios = require("axios");
const cheerio = require("cheerio");

axios.get(`https://github.com/${options.user}`)
	.then(generate)
	.catch(console.error);

function generate(res) {
	console.log(`<svg id="github-activity" width="${53 * options.size}" height="${7 * (options.size)}">`);

	const $ = cheerio.load(res.data);

	const columns = $(".js-calendar-graph-svg g > g");
	let x = 0;
	columns.toArray().forEach((col) => {
		let y = 0;

		$(col).find("rect.day").toArray().forEach((it) => {
			const count = parseInt($(it).data("count"));

			let fill, stroke;
			if (options.vary.includes("color")) {
				[fill, stroke] = getColors(count);
			} else {
				[fill, stroke] = getColors(Number.MAX_VALUE);
			}

			if (options.shape == "square") {
				let xPos = x * options.size;
				let yPos = y * options.size;

				let size;
				if (options.vary.includes("size")) {
					size = Math.min(count + options.incrAmount, (options.size - options.margin) / 2);
					xPos += (-size + options.size) / 2;
					yPos += (-size + options.size) / 2;
				} else {
					size = options.size - options.margin;
				}

				console.log(`\t<rect x="${xPos}" y="${yPos}" width="${size}" height="${size}" fill="${fill}" stroke="${stroke}"></rect>`);
			} else {
				const xPos = x * options.size + (options.size / 2);
				const yPos = y * options.size + (options.size / 2);

				let size;
				if (options.vary.includes("size")) {
					size = Math.min(count + options.incrAmount, (options.size - options.margin) / 2);
				} else {
					size = (options.size - options.margin) / 2;
				}

				console.log(`\t<circle cx="${xPos}" cy="${yPos}" r="${size}" fill="${fill}" stroke="${stroke}"></circle>`);
			}

			y++;
		});

		x++;
	});

	console.log("</svg>");
}

function getColorsForPalette(count, palette) {
	if (count == 0) return palette.none;
	else if (count <= 5) return palette.one;
	else if (count <= 10) return palette.two;
	else if (count <= 15) return palette.three;
	else return palette.max;
}

function getColors(count) {
	const defaults = getColorsForPalette(count, options.colors[options.theme]);
	const overrides = getColorsForPalette(count, options.colors.overrides);
	return [overrides[0] || defaults[0], overrides[1] || defaults[1]];
}