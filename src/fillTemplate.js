const { transform } = require('json4json')

const template = {
	"deck": {
		"@": {
			"game": "bb0f02e7-2a6f-4ae3-84a2-c501b4176844",
			"sleeveid": "0"
		},
		"section": {
			'{{#each data}}': {
				"@": {
					"name": '{{$key}}',
					"shared": "False"
				},
				"card": {
					'{{#each $item}}': {
						"@": {
							"qty": "{{count}}",
							"id": "{{id}}"
						},
						"#": "{{name}}"
					}
				}
			}
		}
	}
}

exports.fillTemplate = function (data) {
	return transform(template, data);
}