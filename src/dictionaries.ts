import { readFile, writeFile } from "./io";
import { writeTranslation } from "./translation";
import { clearEntries } from "./utils";

export const addDictionary = (shortName: string, name: string) => {
	const dicts = getDictionaries();
	dicts[shortName] = name;

	writeDictionaries(dicts);
	initNewTranslation(name);

	console.log(`Added ${name} dictionary`);
};

export const initNewTranslation = (name: string) => {
	const dicts = getDictionaries();
	const defaultKey = Object.keys(dicts)[0];

	let json = readFile(`${defaultKey.toLowerCase()}.translation.json`);
	json = clearEntries(json);
	writeTranslation(json, `${name.toLowerCase()}.translation.json`);
}

export const writeDictionaries = (dicts: any) => {
	const keys = Object.keys(dicts);
	let result = "";

	for (let key of keys) {
		result += `import { ${dicts[key]}Translation } from "./${dicts[
			key
		].toLowerCase()}.translation"; \n`;
	}

	result += "\n";
	result += "export default { \n";
	for (let key of keys) {
		result += `  "${key}": ${dicts[key]}Translation,\n`;
	}
	result += "} as const;\n";

	writeFile("translation.ts", result);
};

export const getDictionaries = (): { [id: string]: string } => readFile("dictionaries.json") as any;

export const initDictionaries = () => {
	const dicts = {
		en: "English",
		es: "Spanish",
	};

	console.log("Initializing dictionaries... \n");

	writeFile("dictionaries.json", JSON.stringify(dicts));
	writeDictionaries(dicts);

	console.log("Dictionaries initialized \n");
};
