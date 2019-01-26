var jsonxml = require('js2xmlparser');
var readDeckData = require('./readDeckData.js').readDeckData;
var resolveCardIds = require('./resolveCardIds.js').resolveCardIds;
var fillTemplate = require('./fillTemplate.js').fillTemplate;
var fs = require('fs');


const cardInfoPath = "D:/Users/MyPC/Documents/OCTGN/GameDatabase/bb0f02e7-2a6f-4ae3-84a2-c501b4176844/Sets";

main("res/sample.txt", "res/out.o8d", cardInfoPath)


function main(inputPath, outputPath, cardInfoPath) {
	//returns {str:[], prov:[] ...}
	let data = readDeckData(inputPath);

	// {str:[{name, id}]}
	resolveCardIds(data, cardInfoPath);

	const keyMap = {
		"stronghold": "Stronghold",
		"provinces": "Province Cards",
		"dynasty": "Dynasty Deck",
		"conflict": "Conflict Deck"
	}
	data = Object.keys(data).forEach(key => { data[keyMap[key]] = data[key]; delete data[key] });

	const jsonDeck = fillTemplate(data);
	const xmlDeck = jsonToXml(jsonDeck);

	fs.writeFileSync(outputPath, xmlDeck);

}


function jsonToXml(json) {
	var options = {
		declaration: {
			encoding: 'utf-8',
			version: '1.0',
			standalone: 'yes'
		},
		format: {
			doubleQuotes: true,
			indent: '  ',
			newline: '\r\n',
			pretty: true
		}
	};

	return jsonxml.parse('data', json, options) + '\r\n'; // options is optional
};



