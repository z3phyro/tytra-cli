import { locations } from "./constants";
import { readFile, writeFile } from "./io";

export const addDictionary = (shortName: string, name: string) => { };

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

  writeFile(locations.write + "translation.ts", result);
};

export const getDictionaries = (): { [id: string]: string } => readFile(locations.write + "dictionaries.json", locations.require + "dictionaries.json") as any;

export const initDictionaries = () => {
  const dicts = {
    en: "English",
    es: "Spanish",
  };

  console.log("Initializing dictionaries... \n");

  writeFile(locations.write + "dictionaries.json", JSON.stringify(dicts));
  writeDictionaries(dicts);

  console.log("Dictionaries initialized \n");
};
