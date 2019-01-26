var fs = require('fs');

function createElement(name, count){
return { "name": name.trim(), "count": count};
}

exports.readDeckData = function (path) {
	const contents = fs.readFileSync(path, 'utf8');
	const lines = contents.split("\n");

	data = {};
	data.stronghold = [];
	data.stronghold.push(createElement(lines.shift(), 1));
	data.provinces = [];

	while (!lines[0].includes("Influence:")) {

		let line = lines[0].substr(0, lines[0].lastIndexOf(" "));
		data.provinces.push(createElement(line, 1));
		lines.shift();
	}

		// spilces out Influence, Dynasty Deck lines
	lines.splice(0, 2);

	data.dynasty = [];

	while (!lines[0].includes("Conflict Deck")) {

		const pattern = /^\dx/i;
		const line = lines.shift();
		const matches = pattern.test(line);

		if (matches === true) {
			const lineParts = line.split(/x /i, 2);
			data.dynasty.push(createElement(lineParts[1], lineParts[0]));
		}
	}

	// spilces out Conflict Deck line
	lines.splice(0, 1);

	data.conflict = [];

	while (!lines.length == 0) {

		const pattern = /^\dx/i;
		const line = lines.shift();
		const matches = pattern.test(line);

		if (matches === true) {
			const lineParts = line.split(/x /i, 2);
			data.conflict.push(createElement(lineParts[1], lineParts[0]));
		}
	}

	return data;
}