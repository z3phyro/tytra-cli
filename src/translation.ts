import JsonToTS from "json-to-ts";
const unset = require("object-unset");
const set = require("object-set");
const at = require("object-at");
import fs from "fs";
import { readFile, writeFile } from "./io";
import { getDictionaries, initDictionaries } from "./dictionaries";

export const surfTranslations = (json: any, trail = "") => {
  const keys = Object.keys(json);

  for (let key of keys) {
    const path = `${trail ? trail + "." : ""}${key}`;
    if (typeof json[key] == "object") surfTranslations(json[key], path);
    else console.log(path, json[key]);
  }
};

export const listTranslation = () => {
  const json = readTranslation();
  surfTranslations(json);
};

export const addTranslation = (entry_path: string, default_values: string[]) => {
  let json = readTranslation();
  let count = 0;

  const dicts = getDictionaries();
  for (let dict of Object.values(dicts)) {
    set(json, entry_path, default_values[count] || "-");;
    writeTranslation(json, dict);

    if (count == 0) {
      writeInterface(json);
    }

    count++;
  }

  console.log(`Entry added ${entry_path} ${default_values} in ${count} Dictionaries \n`);
};

export const writeInterface = (json: any) => {
  const interfaces = JsonToTS(json);
  let result = "";

  for (let inter of interfaces) {
    result += inter + "\n";
  }

  result = result.replace(
    "interface RootObject",
    "export interface TranslationInterface"
  );

  writeFile("translation.interface.ts", result);
};

export const readTranslation = (dictName = "english"): object => {
  return readFile(
    `${dictName}.translation.json`
  );
};

export const writeTranslation = (json: object, dictName = "English") => {
  writeFile(`${dictName.toLowerCase()}.translation.json`, JSON.stringify(json, null, 2));
  let result = `import { TranslationInterface } from "./translation.interface"; 

export const ${dictName}Translation: TranslationInterface = ${JSON.stringify(json, null, 2).replace(/"(\w+)"\s*:/g, '$1:')};
`;

  writeFile(`${dictName.toLowerCase()}.translation.ts`, result);
};

export const removeTranslation = (entry_path: string) => {
  let json = readTranslation();

  unset(json, entry_path);

  writeTranslation(json);

  console.log(`Entry removed ${entry_path} \n`);
  try {
    const parts = entry_path.split(".");
    parts.pop();

    const obj = at(json, parts.join("."));
    if (Object.keys(obj).length === 0) {
      removeTranslation(parts.join("."));
    }
  } catch (e) { }
};

export const initTranslations = () => {
  try {
    if (!fs.existsSync("translations/")) {
      fs.mkdirSync("translations/");
    }
  } catch (e) { }

  initDictionaries();

  const json = {
    general: {
      hello: "Hello World!",
    },
    about: {
      company: "Company",
    },
  };

  const dicts = getDictionaries();

  writeInterface(json);
  for (let dict of Object.values(dicts)) {
    writeTranslation(json, dict);
  }
};
