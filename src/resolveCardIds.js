var fs = require('fs');
var path = require('path');

function getCardsInfo(filePath) {
  const result ={};
	const contents = fs.readFileSync(filePath, 'utf8');
	const lines = contents.split("\n");
	lines.forEach( line => {

		var myRegexp = /<card name="(.*?)" id="(.*?)"/g;
		var match = myRegexp.exec(line);
		if (match){
     result[match[1]] = match[2];    
		};
	});

return result;
};

exports.resolveCardIds = function (data, cardInfoPath) {

	// cardInfoPath is directory with a lot of directories
	const directories = fs.readdirSync(cardInfoPath);

	let cardsInfo = {};

	directories.forEach(directory => {

		const filePath = path.join(cardInfoPath, directory, "set.xml");

		// getCardsInfo returns {name : id, ....}
		// kitas var [{name, id} ...];
		const fileCardsInfo = getCardsInfo(filePath);
		cardsInfo = {...cardsInfo, ...fileCardsInfo};
	});

	// data 
	// {
	// 	dynasty : [{name, count} ..],
	//  ...
	// }
	// returns [ [] ... []]
	const decks = Object.values(data);

	//[{name, count}]  
	decks.forEach(deck => {
		deck.forEach(card => {
			const id = cardsInfo[card.name];
			card.id = id;
		});
	});

}






