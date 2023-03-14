export const clearEntries = (json: any, value = "-") => {
	const keys = Object.keys(json);
	for (let key of keys) {
		if (typeof json[key] == 'object') clearEntries(json[key], value);
		else json[key] = value;
	}
}
