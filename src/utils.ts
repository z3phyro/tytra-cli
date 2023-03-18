export const clearEntries = (json: any, value = "-") => {
	const keys = Object.keys(json);
	for (let key of keys) {
		if (typeof json[key] == 'object') clearEntries(json[key], value);
		else json[key] = value;
	}
}

export const generateInterface = (json: any, name = "Translations") => {
	return `export interface ${name}Interface ${JSON.stringify(json, null, 2)
		.replace(/("\w+"): (".*")(,?\n)/g, '$1: string$3')
		.replace(/"(\w+)"\s*:/g, '$1:')
		}; `;
}

